import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ── Bags API Proxy ──
app.get("/api/bags-proxy", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { endpoint, ...params } = req.query;
  const BASE_URL = "https://public-api-v2.bags.fm/api/v1/";
  const API_KEY = process.env.BAGS_API_KEY;

  if (!API_KEY) {
    console.error("Missing BAGS_API_KEY environment variable");
    return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  }

  if (!endpoint) {
    return res.status(400).json({ success: false, error: "Missing endpoint parameter" });
  }

  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("→ Bags API:", url);

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    console.log("← Status:", response.status, "Body:", text.slice(0, 300));

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ success: false, error: "Invalid JSON from Bags API", raw: text.slice(0, 200) });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Serve React app ──
app.use(express.static(join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐔 Cluck Norris server running on port ${PORT}`);
});
