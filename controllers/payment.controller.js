// /controllers/payment.controller.js
import { success, fail } from "../utils/response.js";
import { createPayment, getPaymentByRide } from "../models/payment.model.js";

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { ride_id, amount, payment_method } = req.body;
    if (!ride_id || !amount) return fail(res, "ride_id & amount required", 400);
    // In prod: call Stripe/Razorpay SDK and return client secret
    const payment = await createPayment({ ride_id, rider_id: req.user?.id, amount, payment_method, transaction_id: `tx_${Date.now()}` });
    return success(res, { clientSecret: `dummy_secret_${payment.id}`, payment });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { ride_id } = req.body;
    const p = await getPaymentByRide(ride_id);
    // Simplistic verification; real verification via gateway webhook
    return success(res, { verified: !!p });
  } catch (err) {
    next(err);
  }
};
