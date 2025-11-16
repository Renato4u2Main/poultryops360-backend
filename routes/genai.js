import express from "express";
import { handleGenAI } from "../controllers/genaiController.js";

const router = express.Router();

router.post("/", handleGenAI);

export default router;
