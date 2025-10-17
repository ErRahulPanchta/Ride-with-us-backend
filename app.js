import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http"; 
import { Server } from "socket.io";

import appConfig from "./config/app.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import driverRoutes from "./routes/driver.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import userRoutes from "./routes/rider.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) =>
  res.json({ status: "ok", env: appConfig.env })
);

// Routes
app.use("/api/riders", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ratings", ratingRoutes);

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

// Error handler
app.use(errorMiddleware);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", //  change this to your frontend origin in production
    methods: ["GET", "POST"],
  },
});

// Store connected drivers & locations
const drivers = new Map();

io.on("connection", (socket) => {
  console.log(" A client connected:", socket.id);

  // Driver shares location
  socket.on("driverLocation", (data) => {
    if (!data?.driverId) return;

    drivers.set(data.driverId, { lat: data.lat, lng: data.lng });
    console.log(`Driver ${data.driverId}:`, data.lat, data.lng);

    // Broadcast location update
    io.emit("driverLocationUpdate", {
      driverId: data.driverId,
      lat: data.lat,
      lng: data.lng,
    });
  });

  socket.on("rideAccepted", (rideData) => {
    // rideData = { ride_id, driver_id, rider_id }
    io.emit(`ride_${rideData.rider_id}_accepted`, rideData);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    // Optional: remove driver from map
  });
});



export default app;
