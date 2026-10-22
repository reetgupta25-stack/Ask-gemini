
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
app.use(express.json());
app.use(express.static("public"));
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: question,
    });
    res.json({ answer: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get an answer from Gemini.",
    });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});