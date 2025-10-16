// /app.js
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import appConfig from "./config/app.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import driverRoutes from "./routes/driver.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import userRoutes from "./routes/rider.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ status: "ok", env: appConfig.env }));

app.use("/api/riders", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ratings", ratingRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Not Found" }));

// error handler
app.use(errorMiddleware);

export default app;
