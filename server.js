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
  res.setHeader("Pragma", "no-cache");
  const { mint } = req.query;
  const HELIUS_KEY = process.env.HELIUS_API_KEY;
  if (!mint) return res.status(400).json({ success: false, error: "Missing mint" });
  if (!HELIUS_KEY) return res.status(500).json({ success: false, error: "Missing HELIUS_API_KEY" });
  const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
  try {
    const response = await fetch(HELIUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: "locks",
        method: "getTokenAccounts",
        params: { page: 1, limit: 1000, mint, owner: JUPITER_LOCK_PROGRAM, displayOptions: { showZeroBalance: false } }
      })
    });
    const data = await response.json();
    console.log("← Helius locks status:", response.status, JSON.stringify(data).slice(0, 300));
    const accounts = data.result?.token_accounts || [];
    const totalLocked = accounts.reduce((sum, a) => sum + (parseInt(a.amount) || 0), 0);
    return res.status(200).json({ success: true, lockCount: accounts.length, totalLocked, locks: accounts.slice(0, 10) });
  } catch (err) {
    console.error("Locks error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Fee Share / Analytics endpoints ──
const FEE_SHARE_CONFIG = "ARrvskHtvihWRtnNnW7CEFTXQ8FLdVx9B2BGL6wxfnM7";
const FEE_CLAIMER_WALLET = "3VELZ2avSUq79qstuR8a7C3euJ834WmQyrjt4uRnn4eb";
const CLKN_MINT_CONST = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";

async function bagsFetch(endpoint, API_KEY) {
  const url = `${BAGS_BASE}${endpoint}`;
  console.log("→ Bags test:", url);
  const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
  const text = await response.text();
  console.log("← Bags test:", response.status, text.slice(0, 300));
  return { status: response.status, text };
}

app.get("/api/fees", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const API_KEY = process.env.BAGS_API_KEY;
  if (!API_KEY) return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  try {
    const { status, text } = await bagsFetch(`token-launch/lifetime-fees?tokenMint=${CLKN_MINT_CONST}`, API_KEY);
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch(e) {
      return res.status(500).json({ success: false, error: "Invalid JSON", raw: text.slice(0,200) });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Partner Stats ──
app.get("/api/partner-stats", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const API_KEY = process.env.BAGS_API_KEY;
  if (!API_KEY) return res.status(500).json({ success: false, error: "Missing BAGS_API_KEY" });
  try {
    const url = `${BAGS_BASE}partner/stats?refCode=firechicken007`;
    console.log("→ Partner stats:", url);
    const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
    const text = await response.text();
    console.log("← Partner stats:", response.status, text.slice(0, 200));
    try { return res.status(200).json(JSON.parse(text)); }
    catch (e) { return res.status(500).json({ success: false, error: "Invalid JSON" }); }
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
  console.log(`BAGS_API_KEY present: ${!!process.env.BAGS_API_KEY}`);
  console.log(`HELIUS_API_KEY present: ${!!process.env.HELIUS_API_KEY}`);
});
