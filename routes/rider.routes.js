import express from "express";
import { registerRider, loginRider, getProfileRider } from "../controllers/rider.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerRider);
router.post("/login", loginRider);
router.get("/me", auth, getProfileRider);

export default router;
