import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Configure CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-app.onrender.com'
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

// Serve static files in production
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(_dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  
  app.get("*", (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) return;
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});