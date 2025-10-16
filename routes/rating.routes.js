// /routes/rating.routes.js
import express from "express";
import * as ratingCtrl from "../controllers/rating.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, ratingCtrl.submit);

export default router;
