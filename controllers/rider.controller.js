import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createRider, getRiderByEmail, getRiderById } from "../models/rider.model.js";
import { success, fail } from "../utils/response.js";

export const registerRider = async (req, res, next) => {
  try {
    const { full_name, email, phone_number, password } = req.body;
    if (!full_name || !email || !phone_number || !password) return fail(res, "All fields required", 400);

    const hashed = await bcrypt.hash(password, 10);
    const rider = await createRider({ full_name, email, phone_number, password_hash: hashed });

    const token = jwt.sign({ id: rider.id, user_type: rider.user_type }, process.env.JWT_SECRET);
    return success(res, { rider, token }, 201);
  } catch (err) {
    next(err);
  }
};

export const loginRider = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const rider = await getRiderByEmail(email);
    if (!rider) return fail(res, "Rider not found", 404);

    const match = await bcrypt.compare(password, rider.password_hash);
    if (!match) return fail(res, "Invalid credentials", 401);

    const token = jwt.sign({ id: rider.id, user_type: rider.user_type }, process.env.JWT_SECRET);
    return success(res, { rider, token });
  } catch (err) {
    next(err);
  }
};

export const getProfileRider = async (req, res, next) => {
  try {
    const rider = await getRiderById(req.user.id);
    if (!rider) return fail(res, "Rider not found", 404);
    return success(res, rider);
  } catch (err) {
    next(err);
  }
};
