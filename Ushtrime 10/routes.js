import express from "express";
import { getAllDestinations } from "./controller/destinationsController.js";
const router = express.Router();
router.get("/getAllDestinations", getAllDestinations);

export default router;
