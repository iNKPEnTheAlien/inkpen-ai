const API = "http://localhost:3000";

async function send() {
  const input = document.getElementById("input");
  const text = input.value;

  const res = await fetch(API + "/v1/chat/completions", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  const output = document.getElementById("output");
  output.innerHTML += "<p>" + data.reply + "</p>";
}
