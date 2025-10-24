import { readData, generateNewId, writeData } from "../utils.js";
export const getAllDestinations = (req, res) => {
  try {
    const name = req.query.name;
    let destinations = readData();
    destinations = destinations.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(destinations);
  } catch (error) {
    console.log(error);
  }
};

export const getOneDestions = (req, res) => {
  const detinationId = Number(req.params.destinationId);
  const destinations = readData();
  const destination = destinations.find(
    (destination) => destination.id === detinationId
  );
  if (!destination) {
    return res.status(404).json({
      success: false,
      message: "Destination not found",
    });
  }

  // Nëse studenti gjendet, kthen të dhënat e tij me status 200 (OK)
  res.status(200).json({
    success: true,
    data: destination,
  });
};

export const createDestination = (req, res) => {
  console.log("mire deri qetu");
  const name = req.body.name;
  const country = req.body.country;
  const averageCost = req.body.average_cost;
  const bestSeason = req.body.best_season;

  if (!name || !country || !averageCost || !bestSeason) {
    return res.status(400).json({
      // 400 = Bad Request (kërkesë e gabuar)
      success: false,
      message: "Please provide name, country, averageCost and bestSeason",
    });
  }
  const destinations = readData();

  const newDestination = {
    id: generateNewId(destinations),
    name,
    country,
    average_cost: averageCost,
    best_season: bestSeason,
  };
  destinations.push(newDestination);
  writeData(destinations);

  if (writeData(destinations)) {
    res.status(201).json({
      // 201 = Created (i krijuar me sukses)
      success: true,
      message: "Destination created successfully",
      data: newDestination,
    });
  } else {
    res.status(500).json({
      // 500 = Internal Server Error (gabim i serverit)
      success: false,
      message: "Error saving destination",
    });
  }
};

export const deleteDestination = (req, res) => {
  const destinations = readData();
  const destinationId = Number(req.params.destinationId);

  const destinationIndex = destinations.findIndex(
    (destination) => destination.id === destinationId
  );
  if (destinationIndex === -1) {
    return res.status(404).json({
      // 404 = Not Found
      success: false,
      message: "Destination not found",
    });
  }
  destinations.splice(destinationIndex, 1);
  const success = writeData(destinations);
  if (success) {
    res.status(204).json({
      success: true,
      message: "Destination deleted successfully",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Erro deleting student",
    });
  }
};
