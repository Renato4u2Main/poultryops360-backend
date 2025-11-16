import express from "express";
import cors from "cors";
import genaiRoutes from "./routes/genaiRoutes.js";  // <-- updated filename

const app = express();
app.use(cors());
app.use(express.json());

// Main API route
app.use("/api", genaiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
