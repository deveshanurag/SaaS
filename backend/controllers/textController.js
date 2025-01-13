const axios = require("axios");

exports.analyseText = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    // Word count
    const wordCount = text.trim().split(/\s+/).length;

    // Simplified grammatical error count (assume more than 20 chars as errors for simplicity)
    const grammaticalErrors =
      text.length > 20 ? Math.floor(Math.random() * 5) : 0;

    // Hindi translation using mock logic (replace this with actual API)
    const hindiTranslation = `Translated: ${text
      .split(" ")
      .map((word) => word + "-हिंदी")
      .join(" ")}`;

    res.status(200).json({
      wordCount,
      grammaticalErrors,
      hindiTranslation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
