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

  add("Thinking...");

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    add(data.reply);

  } catch (e) {
    add("Server not connected.");
  }
}