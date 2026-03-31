import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const BAGS_BASE = "https://public-api-v2.bags.fm/api/v1/";
const JUPITER_LOCK_PROGRAM = "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1MaluFw55K";

function getHeliusUrl() {
  return `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;
}

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
      const response = await fetch(getHeliusUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "holders-" + page,
          method: "getTokenAccounts",
          params: {
            page,
            limit: 1000,
            mint,
            displayOptions: { showZeroBalance: false }
          }
        })
      });
      const data = await response.json();
      console.log("Helius holders page", page, "status:", response.status);
      if (!data.result || !data.result.token_accounts || data.result.token_accounts.length === 0) break;
      data.result.token_accounts.forEach(a => {
        if (a.amount > 0) owners.add(a.owner);
      });
      if (data.result.token_accounts.length < 1000) break;
      page++;
      if (page > 20) break; // safety cap
    }
    console.log("Total unique holders:", owners.size);
    return res.status(200).json({ success: true, holderCount: owners.size });
  } catch (err) {
    console.error("Holders error:", err.message);
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
    const response = await fetch(getHeliusUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "locks",
        method: "getTokenAccounts",
        params: {
          page: 1,
          limit: 1000,
          mint,
          owner: JUPITER_LOCK_PROGRAM,
          displayOptions: { showZeroBalance: false }
        }
      })
    });
    const data = await response.json();
    console.log("Helius locks status:", response.status, JSON.stringify(data).slice(0, 200));
    const accounts = data.result?.token_accounts || [];

    // a.amount may arrive as a string or BigInt-style large number — parse carefully
    const DECIMALS = 6; // standard for most Solana tokens (e.g. USDC, CLKN)
    let totalLockedRaw = BigInt(0);
    accounts.forEach((a, i) => {
      const raw = String(a.amount ?? "0").trim();
      console.log(`Lock account[${i}] owner=${a.owner} amount_raw="${raw}"`);
      try {
        totalLockedRaw += BigInt(raw);
      } catch (e) {
        console.warn(`Lock account[${i}] could not parse amount "${raw}":`, e.message);
      }
    });

    // Convert from raw units to human-readable (divide by 10^DECIMALS)
    const divisor = BigInt(10 ** DECIMALS);
    const wholePart = totalLockedRaw / divisor;
    const fracPart  = totalLockedRaw % divisor;
    const totalLocked = Number(wholePart) + Number(fracPart) / (10 ** DECIMALS);

    console.log(`Locks: ${accounts.length} accounts, raw total=${totalLockedRaw.toString()}, human=${totalLocked}`);

    return res.status(200).json({
      success: true,
      lockCount: accounts.length,
      totalLockedRaw: totalLockedRaw.toString(), // raw lamports as string (avoids JS precision loss)
      totalLocked,                               // decimal-adjusted human-readable amount
      decimals: DECIMALS,
      locks: accounts.slice(0, 10)
    });
  } catch (err) {
    console.error("Locks error:", err.message);
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
