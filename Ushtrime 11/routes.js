import express from "express";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getOneDestions,
} from "./controller/destinationsController.js";
const router = express.Router();
router.get("/getAllDestinations", getAllDestinations);
router.post("/createDestinations", createDestination);
router.get("/getOneDestination/:destinationId", getOneDestions);
router.delete("/deleteDestination/:destinationId", deleteDestination);
export default router;
