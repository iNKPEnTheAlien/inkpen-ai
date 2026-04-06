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

async function generateReply(message) {
  return "Echo: " + message;
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

app.listen(3000);
