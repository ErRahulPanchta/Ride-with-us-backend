// /app.js
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import appConfig from "./config/app.config.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { Server } from "socket.io";


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

const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // change this to your frontend origin in production
    methods: ["GET", "POST"]
  }
});

// Store connected drivers & their locations
const drivers = new Map();

io.on("connection", (socket) => {
  console.log("🔗 A client connected:", socket.id);

  // When driver sends their current location
  socket.on("driverLocation", (data) => {
    // data = { driverId, lat, lng }
    if (!data?.driverId) return;

    drivers.set(data.driverId, { lat: data.lat, lng: data.lng });
    console.log(`📍 Driver ${data.driverId}:`, data.lat, data.lng);

    // Optionally broadcast this to rider(s)
    io.emit("driverLocationUpdate", {
      driverId: data.driverId,
      lat: data.lat,
      lng: data.lng
    });
  });

  // Notify when driver accepts a ride
  socket.on("rideAccepted", (rideData) => {
    // rideData = { ride_id, driver_id, rider_id }
    io.emit(`ride_${rideData.rider_id}_accepted`, rideData);
  });

  // When driver disconnects
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    // Optionally remove driver from map
  });
});

export default app;
