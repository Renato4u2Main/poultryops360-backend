const { GoogleGenAI } = require("@google/genai");;

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_API_KEY 
});

const generateResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro" 
    });
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("GenAI Error:", error);
    throw new Error("Failed to generate response");
  }
};

module.exports = { generateResponse };
