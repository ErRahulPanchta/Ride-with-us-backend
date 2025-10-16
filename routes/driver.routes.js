import express from "express";
import {
  registerDriver,
  loginDriver,
  getMyDriver,
  setStatus,
  updateLocation,
} from "../controllers/driver.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get("/me", auth, getMyDriver);
router.post("/status", auth, setStatus);
router.post("/location", auth, updateLocation);

export default router;
