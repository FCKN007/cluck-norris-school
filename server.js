import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const BAGS_BASE = "https://public-api-v2.bags.fm/api/v1/";
const JUPITER_LOCK_PROGRAM = "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn";

// ── Bags API Proxy ──
app.get("/api/bags-proxy", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const { endpoint, ...params } = req.query;
  const API_KEY = process.env.BAGS_API_KEY;
  if (!API_KEY) return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  if (!endpoint) return res.status(400).json({ success: false, error: "Missing endpoint" });
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BAGS_BASE}${endpoint}${queryString ? `?${queryString}` : ""}`;
    console.log("→ Bags:", url);
    const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
    const text = await response.text();
    console.log("← Bags:", response.status, text.slice(0, 150));
    try { return res.status(200).json(JSON.parse(text)); }
    catch (e) { return res.status(500).json({ success: false, error: "Invalid JSON" }); }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Helius — Holder Count ──
app.get("/api/holders", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  const { mint } = req.query;
  const HELIUS_KEY = process.env.HELIUS_API_KEY;
  console.log("→ Holders request for mint:", mint);
  console.log("→ Helius key present:", !!HELIUS_KEY);
  if (!mint) return res.status(400).json({ success: false, error: "Missing mint" });
  if (!HELIUS_KEY) return res.status(500).json({ success: false, error: "Missing HELIUS_API_KEY" });
  const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
  try {
    let page = 1;
    const owners = new Set();
    while (true) {
      const response = await fetch(HELIUS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: `holders-${page}`,
          method: "getTokenAccounts",
          params: { page, limit: 1000, mint, displayOptions: { showZeroBalance: false } }
        })
      });
      const data = await response.json();
      console.log(`← Helius holders page ${page} status:`, response.status, "accounts:", data.result?.token_accounts?.length);
      if (!data.result?.token_accounts?.length) break;
      data.result.token_accounts.forEach(a => { if (parseInt(a.amount) > 0) owners.add(a.owner); });
      if (data.result.token_accounts.length < 1000) break;
      page++;
      if (page > 20) break;
    }
    console.log("Total holders:", owners.size);
    return res.status(200).json({ success: true, holderCount: owners.size });
  } catch (err) {
    console.error("Holders error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Jupiter Lock — hardcoded from lock.jup.ag ──
app.get("/api/locks", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  // Hardcoded CLKN locks from lock.jup.ag
  const locks = [
    { title: "Team 1", recipient: "3VEL...n4eb", amount: 15000000, unlockDate: "Apr 30, 2026", schedule: "1,250,000 CLKN/month" },
    { title: "Chuck 1", recipient: "97SV...Ribk", amount: 15000000, unlockDate: "May 2, 2027", schedule: "625,000 CLKN/month" },
    { title: "Team 2 - Full Year Lock", recipient: "3VEL...n4eb", amount: 15000000, unlockDate: "Mar 31, 2028", schedule: "15,000,000 CLKN/year" },
    { title: "Chuck 2", recipient: "97SV...Ribk", amount: 15000000, unlockDate: "May 2, 2026", schedule: "625,000 CLKN/month" },
  ];
  const totalLocked = locks.reduce((sum, l) => sum + l.amount, 0);
  console.log("← Locks: returning", locks.length, "locks, total:", totalLocked);
  return res.status(200).json({ success: true, lockCount: locks.length, totalLocked, locks });
});

// ── Serve React app ──
app.use(express.static(join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🐔 Cluck Norris server running on port ${PORT}`);
  console.log(`BAGS_API_KEY present: ${!!process.env.BAGS_API_KEY}`);
  console.log(`HELIUS_API_KEY present: ${!!process.env.HELIUS_API_KEY}`);
});
