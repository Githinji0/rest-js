import express from "express";
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

// Initialize database connection
connectToDatabase();
// Load environment variables from .env file
config();

const PORT = process.env.PORT || 3000;

// Handle unresolved promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Gracefully close server and disconnect from database
  server.close(async () => {
    await disconnectFromDatabase();
    process.exit(1);
  });
});

// Handle uncaught synchronous errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Disconnect from database and exit process
  disconnectFromDatabase();
  process.exit(1);
});

// Handle graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  // Close database connection before exiting
  await disconnectFromDatabase();
  // Exit with success code
  process.exit(0);
});

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
