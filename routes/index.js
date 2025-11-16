import { Router } from "express";
import healthRoute from "./health.js";
import sampleController from "../controllers/sampleController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("PoultryOps360 Backend is running");
});

// Health check
router.use("/health", healthRoute);

// Example controller route
router.get("/example", sampleController.example);

export default router;
