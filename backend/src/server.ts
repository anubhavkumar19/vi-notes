import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

connectDB();

// API routes - these must come BEFORE the catch-all route
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

// Production setup
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");
  console.log('Serving frontend from:', frontendPath);
  
  // Serve static files
  app.use(express.static(frontendPath));
  
  // Handle client-side routing - THIS MUST BE LAST
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});