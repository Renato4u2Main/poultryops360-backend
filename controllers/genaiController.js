import { GoogleGenAI } from "@google/genai";  // may need adjustment if you use import vs require

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function handleGenAI(req, res) {
  try {
    const { type, prompt, image, mimeType, context, projects, milestones, users, clients } = req.body;

    let reply;

    switch(type) {
      case "milestoneUpdate":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        break;
      case "imageAnalysis":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: {
            parts: [
              {
                inlineData: {
                  data: image.split(",")[1],
                  mimeType
                }
              },
              {
                text: prompt
              }
            ]
          }
        });
        break;
      case "refineComment":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        break;
      case "projectSummary":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt  // you would rebuild prompt here based on milestones/users
        });
        break;
      case "riskAssessment":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt  // same
        });
        break;
      case "weeklyReport":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt
        });
        break;
      case "copilot":
        reply = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        break;
      default:
        return res.status(400).json({ error: "Unknown type" });
    }

    // If reply is object with .text
    const text = reply.text ? reply.text.trim() : String(reply).trim();

    return res.json({ reply: text });

  } catch (err) {
    console.error("GenAI endpoint error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
