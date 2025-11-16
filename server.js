const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running successfully!' });
});

// GenAI route
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { generateResponse } = require('./controllers/genaiController');
    const result = await generateResponse(prompt);
    res.json({ response: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
