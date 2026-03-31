import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const BAGS_BASE = "https://public-api-v2.bags.fm/api/v1/";
const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;
const JUPITER_LOCK_PROGRAM = "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1MaluFw55K";

// ── Bags API Proxy ──
app.get("/api/bags-proxy", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { endpoint, ...params } = req.query;
  const API_KEY = process.env.BAGS_API_KEY;
  if (!API_KEY) return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  if (!endpoint) return res.status(400).json({ success: false, error: "Missing endpoint" });
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BAGS_BASE}${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("→ Bags API:", url);
    const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
    const text = await response.text();
    console.log("← Bags:", response.status, text.slice(0, 200));
    try { return res.status(200).json(JSON.parse(text)); }
    catch (e) { return res.status(500).json({ success: false, error: "Invalid JSON", raw: text.slice(0, 200) }); }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Helius — Holder Count ──
app.get("/api/holders", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { mint } = req.query;
  if (!mint) return res.status(400).json({ success: false, error: "Missing mint" });
  if (!process.env.HELIUS_API_KEY) return res.status(500).json({ success: false, error: "Missing HELIUS_API_KEY" });

  try {
    let page = 1;
    const owners = new Set();
    while (true) {
      const response = await fetch(HELIUS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0", id: "holders", method: "getTokenAccounts",
          params: { page, limit: 1000, mint, displayOptions: {} }
        })
      });
      const data = await response.json();
      if (!data.result || data.result.token_accounts.length === 0) break;
      data.result.token_accounts.forEach(a => {
        if (a.amount > 0) owners.add(a.owner);
      });
      if (data.result.token_accounts.length < 1000) break;
      page++;
    }
    return res.status(200).json({ success: true, holderCount: owners.size });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Helius — Jupiter Locks ──
app.get("/api/locks", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { mint } = req.query;
  if (!mint) return res.status(400).json({ success: false, error: "Missing mint" });
  if (!process.env.HELIUS_API_KEY) return res.status(500).json({ success: false, error: "Missing HELIUS_API_KEY" });

  try {
    // Get all token accounts owned by Jupiter Lock program for this mint
    const response = await fetch(HELIUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: "locks", method: "getTokenAccounts",
        params: { page: 1, limit: 1000, mint, displayOptions: {}, owner: JUPITER_LOCK_PROGRAM }
      })
    });
    const data = await response.json();
    const locks = data.result?.token_accounts || [];
    const totalLocked = locks.reduce((sum, a) => sum + (a.amount || 0), 0);
    return res.status(200).json({
      success: true,
      lockCount: locks.length,
      totalLocked,
      locks: locks.slice(0, 10) // return top 10
    });
  } catch (err) {
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
