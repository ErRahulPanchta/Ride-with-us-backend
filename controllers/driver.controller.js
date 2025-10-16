import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createDriver,
  getDriverByEmail,
  getDriverByUserId,
  updateDriverStatus,
  upsertLocation,
} from "../models/driver.model.js";
import { success, fail } from "../utils/response.js";

export const registerDriver = async (req, res, next) => {
  try {
    const { full_name, email, phone_number, password, license_number } = req.body;
    if (!full_name || !email || !phone_number || !password || !license_number)
      return fail(res, "All fields required", 400);

    const hashed = await bcrypt.hash(password, 10);
    const { user, driver } = await createDriver({
      full_name,
      email,
      phone_number,
      password_hash: hashed,
      license_number,
    });

    const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.JWT_SECRET);
    return success(res, { user, driver, token }, 201);
  } catch (err) {
    next(err);
  }
};

export const loginDriver = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getDriverByEmail(email);
    if (!user) return fail(res, "Driver not found", 404);

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return fail(res, "Invalid credentials", 401);

    const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.JWT_SECRET);
    return success(res, { user, token });
  } catch (err) {
    next(err);
  }
};

export const getMyDriver = async (req, res, next) => {
  try {
    const driver = await getDriverByUserId(req.user.id);
    if (!driver) return fail(res, "Driver profile not found", 404);
    return success(res, driver);
  } catch (err) {
    next(err);
  }
};

export const setStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const driver = await getDriverByUserId(req.user.id);
    if (!driver) return fail(res, "Driver not found", 404);

    const updated = await updateDriverStatus(driver.id, status);
    return success(res, updated);
  } catch (err) {
    next(err);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const driver = await getDriverByUserId(req.user.id);
    if (!driver) return fail(res, "Driver not found", 404);

    const loc = await upsertLocation(driver.id, latitude, longitude);
    return success(res, loc);
  } catch (err) {
    next(err);
  }
};
