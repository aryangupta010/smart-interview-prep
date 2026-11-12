
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

app.get("/", (req, res) => {
  res.json({ message: "SmartPrep backend is running!" });
});

app.post("/api/ai/interview", async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: "Gemini API key is not configured on the server.",
      });
    }

    const question =
      typeof req.body.question === "string"
        ? req.body.question.trim()
        : "";

    if (!question || question.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Enter a question up to 3000 characters.",
      });
    }

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: `You are SmartPrep's interview preparation assistant.
Give a clear, accurate, beginner-friendly interview answer with a short example when useful.
User's question: ${question}`,
    });

    res.json({
      success: true,
      answer: result.text || "No answer was returned. Please try again.",
    });
  } catch (error) {
   console.error("AI request failed:", error);
    res.status(500).json({
      success: false,
      message: "AI request failed. Check server configuration and API limits.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SmartPrep server running at http://localhost:${PORT}`);
});