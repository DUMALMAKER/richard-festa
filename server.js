// server.js — Servidor simples para a lista de presença funcionar em QUALQUER aparelho.
// Como usar:
//   1) Instale o Node.js (https://nodejs.org)
//   2) Na pasta dos arquivos, rode:  npm install express
//   3) Depois rode:  node server.js
//   4) Abra http://localhost:3000  (ou o IP do seu computador na rede)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const FILE = path.join(__dirname, "guests.json");
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

const read  = () => JSON.parse(fs.existsSync(FILE) ? fs.readFileSync(FILE, "utf8") : "[]");
const write = (d) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2));

app.get("/api/rsvps", (req, res) => res.json(read()));
app.post("/api/rsvps", (req, res) => {
  write(Array.isArray(req.body.lista) ? req.body.lista : []);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🎉 Site do aniversário rodando em http://localhost:${PORT}`));
