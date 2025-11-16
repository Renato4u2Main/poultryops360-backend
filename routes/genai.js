import express from "express";
import { handleGenAI } from "../controllers/genaiController.js";

const router = express.Router();

router.post("/genai", handleGenAI);

export default router;
