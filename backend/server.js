import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";
import connectMongo from "./database/mongo.js";
import goalRoutes from "./router/routes/goalRoutes.js";
import userRoutes from "./router/routes/userRoutes.js";

dotenv.config();

// Fire Up
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
connectMongo();

// Middleware
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

// Health
app.get("/health", (req, res) => {
  res.status(200).json({ Message: "Healthy" });
});

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runnning on Port - ${port}`);
});
