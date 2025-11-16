import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load all routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
