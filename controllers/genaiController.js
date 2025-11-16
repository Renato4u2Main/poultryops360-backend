import { GoogleGenerativeAI } from "@google/genai";;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Generate text using a specific model
async function runTextModel(model, prompt) {
  const aiModel = genAI.getGenerativeModel({ model });
  const result = await aiModel.generateContent(prompt);
  return result.response.text();
}

// Generate response when image is included
async function runImageModel(model, imageBase64, mimeType, prompt) {
  const aiModel = genAI.getGenerativeModel({ model });

  const result = await aiModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { data: imageBase64, mimeType } },
          { text: prompt }
        ]
      }
    ]
  });

  return result.response.text();
}

export const handleGenAI = async (req, res) => {
  try {
    const { type } = req.body;

    let reply = "No response generated.";

    // --------------------------------------
    // 1️ Milestone Update
    // --------------------------------------
    if (type === "milestoneUpdate") {
      const prompt = `
You are a professional poultry operations project manager.
Rewrite the following raw notes into a clean, concise, professional update.

Raw notes:
"${req.body.prompt}"
`;
      reply = await runTextModel("gemini-2.5-flash", prompt);
    }

    // --------------------------------------
    // 2️ Image Analysis
    // --------------------------------------
    else if (type === "imageAnalysis") {
      const prompt = `
Briefly describe the key elements in this poultry-related image.
Be factual and concise.
`;
      const base64 = req.body.image.split(",")[1];
      reply = await runImageModel(
        "gemini-2.5-flash",
        base64,
        req.body.mimeType,
        prompt
      );
    }

    // --------------------------------------
    // 3️ Refine Scope Comment
    // --------------------------------------
    else if (type === "refineComment") {
      const prompt = `
Rewrite the following poultry operations comment to be clearer,
professional, and concise:

"${req.body.prompt}"
`;
      reply = await runTextModel("gemini-2.5-flash", prompt);
    }

    // --------------------------------------
    // 4️ Project Summary
    // --------------------------------------
    else if (type === "projectSummary") {
      const prompt = `
You are an AI assistant creating a high-level project summary.

Milestones:
${JSON.stringify(req.body.milestones, null, 2)}

Users:
${JSON.stringify(req.body.users, null, 2)}

Write a professional project summary with:
1. Overall summary
2. Recent achievements
3. Upcoming priorities
`;
      reply = await runTextModel("gemini-2.5-pro", prompt);
    }

    // --------------------------------------
    // 5️ Risk Assessment
    // --------------------------------------
    else if (type === "riskAssessment") {
      const prompt = `
You are an AI risk analyst for poultry operations.

Analyze these milestones and users and produce:
1. High-priority risks
2. Medium-priority risks
3. Recommendations

Milestones:
${JSON.stringify(req.body.milestones, null, 2)}

Users:
${JSON.stringify(req.body.users, null, 2)}
`;
      reply = await runTextModel("gemini-2.5-pro", prompt);
    }

    // --------------------------------------
    // 6️ Weekly Report Summary
    // --------------------------------------
    else if (type === "weeklyReport") {
      const prompt = `
Generate a professional weekly poultry operations project report.

Projects:
${JSON.stringify(req.body.projects, null, 2)}

Milestones:
${JSON.stringify(req.body.milestones, null, 2)}

Users:
${JSON.stringify(req.body.users, null, 2)}

Clients:
${JSON.stringify(req.body.clients, null, 2)}
`;
      reply = await runTextModel("gemini-2.5-pro", prompt);
    }

    // --------------------------------------
    // Unknown Type
    // --------------------------------------
    else {
      return res.status(400).json({ error: "Invalid 'type' field." });
    }

    res.json({ reply });

  } catch (err) {
    console.error("GenAI backend error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
};
