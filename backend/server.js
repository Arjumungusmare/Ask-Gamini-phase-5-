const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(5501, 5000));
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        output: "Question is required.",
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Give me a short answer: ${question}`,
              },
            ],
          },
        ],
      }
    );
    const answer =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No answer found.";

    res.json({
      output: answer,
    });

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);

    res.status(500).json({
      output: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

