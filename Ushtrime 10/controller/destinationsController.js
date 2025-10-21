import { readData } from "../utils.js";
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
