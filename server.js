import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ── Bags API Proxy ──
app.get("/api/bags-proxy", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { type, mint, endpoint, ...rest } = req.query;
  const BASE_URL = "https://public-api-v2.bags.fm/api/v1/";
  const API_KEY = process.env.BAGS_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  }

  // SDK-style fee route
  if (type === "fees" && mint) {
    try {
      const url = `${BASE_URL}analytics/token-lifetime-fees?tokenMint=${mint}`;
      const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ success: false, error: "Fees fetch failed" });
    }
  }

  // Generic REST route
  if (endpoint) {
    try {
      const queryString = new URLSearchParams(rest).toString();
      const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;
      console.log("BAGS URL:", url);
      const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ success: false, error: "REST fetch failed" });
    }
  }

  return res.status(400).json({ success: false, error: "Missing type or endpoint" });
});

// ── Serve React app ──
app.use(express.static(join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐔 Cluck Norris server running on port ${PORT}`);
});
