const types = ["All", "Rose", "Tulip", "Sunflower", "Blossom"];
let selected = "All";

async function showFeed() {
  const flowers = await (await fetch("/api/feed")).json();
  const list = flowers.filter(f => selected === "All" || f.type === selected);
  document.getElementById("feed").innerHTML = list
    .map(f => `<div class="card">${f.icon}<br>${f.name}</div>`).join("");
}

document.getElementById("filters").innerHTML = types
  .map(t => `<button onclick="pick('${t}')">${t}</button>`).join("");

async function pick(type) {
  selected = type;
  if (type !== "All") {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
  }
  showFeed();
}

showFeed();