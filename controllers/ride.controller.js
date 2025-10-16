import { success, fail } from "../utils/response.js";
import { createRide, getRideById, updateRide } from "../models/ride.model.js";

export const requestRide = async (req, res, next) => {
  try {
    const rideData = {
      rider_id: req.user.id,
      ...req.body
    };
    const ride = await createRide(rideData);
    return success(res, ride, 201);
  } catch (err) {
    next(err);
  }
};

export const getRide = async (req, res, next) => {
  try {
    const ride = await getRideById(req.params.rideId);
    if (!ride) return fail(res, "Ride not found", 404);
    return success(res, ride);
  } catch (err) {
    next(err);
  }
};

export const acceptRide = async (req, res, next) => {
  try {
    const ride = await updateRide(req.params.rideId, { driver_id: req.user.id, status: "accepted" });
    return success(res, ride);
  } catch (err) {
    next(err);
  }
};

export const updateRideStatus = async (req, res, next) => {
  try {
    const ride = await updateRide(req.params.rideId, { status: req.body.status });
    return success(res, ride);
  } catch (err) {
    next(err);
  }
};
