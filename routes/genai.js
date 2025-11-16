import express from "express";
import { handleGenAI } from "../controllers/genaiController.js";

const router = express.Router();

// This defines POST /genai
router.post("/genai", handleGenAI);

export default router;
