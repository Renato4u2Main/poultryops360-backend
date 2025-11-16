import { GoogleGenerativeAI } from "@google/genai";

export const handleGenAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ text });
  } catch (err) {
    console.error("GenAI error:", err);
    res.status(500).json({ error: err.message });
  }
};
