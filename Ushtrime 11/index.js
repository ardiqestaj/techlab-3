import express from "express";
import dotenv from "dotenv";
import destinationRoter from "./routes.js";

dotenv.config();
const app = express();
app.use(express.json());

// app.get("/students", (req, res) => {
//   console.log("Po bon");
//   res.json({
//     success: true,
//     message: "Is Working",
//   });
// });

app.use("/api", destinationRoter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
