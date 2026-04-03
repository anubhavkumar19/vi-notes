import express from "express";
import { saveSession } from "../controllers/sessionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, saveSession);

export default router;