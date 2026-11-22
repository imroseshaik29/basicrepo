const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const flowers = [
  { name: "Red Rose", type: "Rose", icon: "🌹" },
  { name: "Pink Rose", type: "Rose", icon: "🌹" },
  { name: "Tulip", type: "Tulip", icon: "🌷" },
  { name: "Yellow Tulip", type: "Tulip", icon: "🌷" },
  { name: "Sunflower", type: "Sunflower", icon: "🌻" },
  { name: "Cherry Blossom", type: "Blossom", icon: "🌸" },
];

const FILE = "records.json";
const load = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : {});

app.post("/api/track", (req, res) => {
  const records = load();
  records[req.body.type] = (records[req.body.type] || 0) + 1;
  fs.writeFileSync(FILE, JSON.stringify(records));
  res.sendStatus(200);
});

app.get("/api/feed", (req, res) => {
  const r = load();
  const feed = [...flowers].sort((a, b) => (r[b.type] || 0) - (r[a.type] || 0));
  res.json(feed);
});

app.listen(3000, () => console.log("http://localhost:3000"));