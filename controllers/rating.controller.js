// /controllers/rating.controller.js
import { success, fail } from "../utils/response.js";
import { submitRating } from "../models/rating.model.js";

export const submit = async (req, res, next) => {
  try {
    const raterId = req.user?.id;
    const { ride_id, driver_id, rating, feedback } = req.body;
    if (!raterId) return fail(res, "Unauthorized", 401);
    if (!ride_id || !driver_id || !rating) return fail(res, "ride_id, driver_id, rating required", 400);
    const result = await submitRating({ ride_id, rider_id: raterId, driver_id, rating, feedback });
    return success(res, result, 201);
  } catch (err) {
    next(err);
  }
};
