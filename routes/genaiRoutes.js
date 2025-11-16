import express from "express";
import { runGenAI } from "../controllers/genaiController.js";

const router = express.Router();

router.post("/genai", runGenAI);

export default router;
