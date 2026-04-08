const log = document.getElementById("log");

function add(text) {
  const div = document.createElement("div");
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function send() {
  const input = document.getElementById("input");
  const text = input.value;

  if (!text) return;

  add("> " + text);
  input.value = "";

  const thinking = document.createElement("div");
  thinking.textContent = "Thinking...";
  log.appendChild(thinking);

  try {
    const res = await fetch("https://inkpen-backend.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: text })
    });

    const data = await res.json();

    thinking.remove();
    add(data.reply || "No response.");

  } catch (err) {
    thinking.remove();
    add("ERROR: Backend not responding.");
  }
}

