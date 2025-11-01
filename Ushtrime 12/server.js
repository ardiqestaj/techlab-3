import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/database.js";
import apiRoutes from "./routes/routes.js";

dotenv.config();
const app = express();

app.use(cors("*"));
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date(),
  });
});

const PORT = process.env.PORT;
const startServer = async () => {
  try {
    // Connect to DB
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
