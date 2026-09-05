import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { MongoMemoryServer } from "mongodb-memory-server";
import { seedDatabase } from "./seed.js";

const app = express();
dotenv.config();

let isConnected = false;

const connect = async () => {
  if (isConnected || mongoose.connection.readyState === 1) return;
  try {
    const mongoUri = process.env.MONGO;
    if (mongoUri && mongoUri !== "your_uri" && (mongoUri.startsWith("mongodb://") || mongoUri.startsWith("mongodb+srv://"))) {
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB via process.env.MONGO.");
    } else {
      console.log("No external MongoDB URI specified in .env. Starting embedded MongoDB...");
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log("Connected to embedded MongoDB at:", uri);
    }
    isConnected = true;
    await seedDatabase();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Ensure DB is connected before processing requests
app.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (err) {
    next(err);
  }
});

// Support both /api/ prefix and direct paths
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

if (!process.env.VERCEL) {
  app.listen(8800, () => {
    connect();
    console.log("Connected to backend on port 8800.");
  });
}

export default app;
