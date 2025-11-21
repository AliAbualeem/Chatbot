import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const OPENROUTER_API_KEY = ""; // ضع مفتاحك الصحيح

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My Chatbot",
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        model: "google/gemma-3n-e2b-it:free",
        messages: req.body.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ خطأ من OpenRouter:", data);
      return res.status(500).json({ error: data.error || "خطأ في استدعاء OpenRouter." });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ خطأ في الاتصال:", error);
    res.status(500).json({ error: "حدث خطأ في الاتصال أو في الاستجابة." });
  }
});

app.listen(3000, () => {
  console.log("✅ الخادم يعمل على http://localhost:3000");
});
