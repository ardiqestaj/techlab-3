import fs from "fs";

export const readData = () => {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const writeData = (data) => {
  try {
    // JSON.stringify konverton objektin JavaScript në tekst JSON
    // Parametri i dytë (null) dhe i tretë (2) formaton JSON-in me hapësira për lehtësi leximi
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    return true; // Kthen true nëse shkrimi ishte i suksesshëm
  } catch (error) {
    console.log("Error writting data", error); // Logon gabimin nëse ndodh
    return false; // Kthen false nëse ka gabim
  }
};

export const generateNewId = (data) => {
  // const maxId = Math.max(...data.map((student) => student.id));

  let maxId = 0;
  for (let item of data) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
};
