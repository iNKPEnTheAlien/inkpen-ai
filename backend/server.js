import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let messageCount = 0;
let unlocked = false;

const CASH_APP = "https://cash.app/$oufsidetattoos";

const systemPrompt =
  "You are iNKPEN AI. Be sharp, direct, confident, and efficient.";

async function generateReply(message) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch {
    return "AI error.";
  }
}

app.post("/v1/chat/completions", async (req, res) => {
  const { message } = req.body;

  if (!unlocked) {
    messageCount++;
    if (messageCount > 20) {
      return res.json({
        reply:
          "You’ve reached the limit.\nUnlock full access:\n" + CASH_APP
      });
    }
  }

  const reply = await generateReply(message);
  res.json({ reply });
});

app.post("/v1/content", async (req, res) => {
  const prompt = `
Generate 3 posts:
Scenario, Weak reply, Strong reply, Caption, CTA with ${CASH_APP}
`;

  const reply = await generateReply(prompt);
  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
