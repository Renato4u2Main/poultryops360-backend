import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("PoultryOps360 Backend is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Render irá fornecer a porta via variável de ambiente PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
