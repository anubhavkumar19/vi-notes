import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const frontendPath = path.resolve(_dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});