import express from "express";
import { requestRide, getRide, acceptRide, updateRideStatus } from "../controllers/ride.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", auth, requestRide);
router.get("/:rideId", auth, getRide);
router.post("/:rideId/accept", auth, acceptRide);
router.patch("/:rideId/status", auth, updateRideStatus);

export default router;
