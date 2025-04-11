import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jobRoutes from "./routes/jobRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup - more permissive for troubleshooting
app.use(cors());
app.use(express.json());

// API routes - keep this before static file serving
app.use("/api", jobRoutes);

// Path to frontend build directory
const frontendBuildPath = path.resolve(__dirname, "../job-portal-site/dist");

// Serve static files from the frontend build
app.use(express.static(frontendBuildPath));

// Serve index.html for client-side routing
// Use a safer approach to avoid path-to-regexp issues
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Handle client-side routing for other paths
// Avoid using wildcard (*) which might cause path-to-regexp issues
app.get("/jobs", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.get("/job/:id", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Add other frontend routes as needed
// ...

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📭 API Endpoint: http://localhost:${PORT}/api/jobs`);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
