// /routes/payment.routes.js
import express from "express";
import * as paymentCtrl from "../controllers/payment.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-intent", auth, paymentCtrl.createPaymentIntent);
router.post("/verify", auth, paymentCtrl.verifyPayment);

export default router;
