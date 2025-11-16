import express from "express";
import cors from "cors";
import genaiRouter from "./routes/genai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", genaiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
