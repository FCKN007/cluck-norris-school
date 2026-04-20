import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createSign } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// ── Ultimate Challenge Claims — Google Sheets ──
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1nh3BXxalBOCMbM3EDDWiMBJtDbbYT0WyXGQjKFAarIY";
const SHEET_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const SHEET_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

async function getGoogleToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: SHEET_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  })).toString("base64url");

  // createSign imported at top
  const sign = createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const privateKey = (SHEET_PRIVATE_KEY || "")
    .replace(/\\n/g, "\n")
    .replace(/\\\\n/g, "\n")
    .trim();
  const signature = sign.sign(privateKey, "base64url");
  const jwt = `${header}.${payload}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) console.error("❌ Token error:", JSON.stringify(tokenData));
  else console.log("✅ Google token obtained");
  return tokenData.access_token;
}

async function appendToSheet(values) {
  const token = await getGoogleToken();
  if (!token) { console.error("❌ No Google token obtained"); return false; }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:H:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  console.log("→ Sheets append URL:", url);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [values] })
  });
  const text = await res.text();
  console.log("← Sheets append:", res.status, text.slice(0, 200));
  return res.ok;
}

async function getSheetRows() {
  const token = await getGoogleToken();
  if (!token) { console.error("❌ No Google token for getSheetRows"); return []; }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:H`;
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("← Sheets read:", res.status, JSON.stringify(data).slice(0, 200));
  return data.values || [];
}

async function checkCLKNHolder(wallet) {
  try {
    const HELIUS_KEY = process.env.HELIUS_API_KEY;
    const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
    const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "holder-check",
        method: "getTokenAccountsByOwner",
        params: [
          wallet,
          { mint: CLKN_MINT },
          { encoding: "jsonParsed" }
        ]
      })
    });
    const data = await response.json();
    const accounts = data?.result?.value || [];
    if (accounts.length > 0) {
      const balance = accounts[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0;
      return { isHolder: balance > 0, balance };
    }
    return { isHolder: false, balance: 0 };
  } catch(e) {
    console.error("Holder check error:", e.message);
    return { isHolder: false, balance: 0 };
  }
}

app.post("/api/claim", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { wallet, score, total, pct, source } = req.body;
  if (!wallet || wallet.length < 32) return res.status(400).json({ success: false, error: "Invalid wallet" });
  try {
    // Check for duplicates
    const rows = await getSheetRows();
    const exists = rows.some(row => row[0] === wallet);
    if (exists) return res.status(200).json({ success: true, message: "Already claimed" });
    // Check if CLKN holder
    const { isHolder, balance } = await checkCLKNHolder(wallet);
    const holderStatus = isHolder ? "✅ YES" : "❌ NO";
    const date = new Date().toISOString();
    await appendToSheet([wallet, score, total, pct, date, holderStatus, balance, source || "CHALLENGE"]);
    console.log(`🏆 New claim: ${wallet} — ${score}/${total} (${pct}%) — CLKN Holder: ${holderStatus} (${balance})`);
    return res.status(200).json({ success: true, isHolder, balance });
  } catch(err) {
    console.error("Sheets error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/claims", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const auth = req.query.key;
  if (auth !== "firechicken007") return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    const rows = await getSheetRows();
    const headers = rows[0] || [];
    const data = rows.slice(1).map(row => ({
      wallet: row[0], score: row[1], total: row[2], pct: row[3], date: row[4], holder: row[5], balance: row[6], source: row[7]
    }));
    return res.status(200).json({ success: true, count: data.length, claims: data });
  } catch(err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Verify CLKN Payment for AI Unlock ──
const CLKN_RECEIVE_WALLET = "7LHBcRYosycMBwBqxBHeRiDQohYzpppDALKYVT4TNY5H";
const CLKN_MINT_ADDR = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
const UNLOCK_AMOUNT = 500;
const UNLOCK_QUESTIONS = 20;

app.post("/api/verify-clkn-payment", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { unlockAmount } = req.body;
  if (!unlockAmount) return res.status(400).json({ success: false, error: "Missing unlock amount" });

  const HELIUS_KEY = process.env.HELIUS_API_KEY;
  const expectedAmount = parseFloat(parseFloat(unlockAmount).toFixed(1));
  const tolerance = 0.15;

  try {
    // Use Helius enhanced transactions — shows balance changes per wallet cleanly
    const url = `https://api.helius.xyz/v0/addresses/${CLKN_RECEIVE_WALLET}/transactions?api-key=${HELIUS_KEY}&limit=10`;
    console.log(`🔍 Checking balance changes for ${CLKN_RECEIVE_WALLET.slice(0,8)}... expected:${expectedAmount}`);
    const response = await fetch(url);
    const txs = await response.json();

    if (!Array.isArray(txs)) {
      console.error("❌ Bad response:", JSON.stringify(txs).slice(0,200));
      return res.status(500).json({ success: false, error: "Could not fetch transactions" });
    }

    console.log(`🔍 Got ${txs.length} transactions`);

    for (const tx of txs) {
      // Look through accountData for our wallet's token balance changes
      const accountData = tx.accountData || [];
      for (const acct of accountData) {
        if (acct.account !== CLKN_RECEIVE_WALLET) continue;
        const tokenChanges = acct.tokenBalanceChanges || [];
        for (const change of tokenChanges) {
          if (change.mint !== CLKN_MINT_ADDR) continue;
          const amount = parseFloat(parseFloat(change.rawTokenAmount?.uiAmount || 0).toFixed(1));
          console.log(`🔍 TX ${tx.signature?.slice(0,8)} CLKN change: ${amount}`);
          if (amount > 0 && Math.abs(amount - expectedAmount) <= tolerance) {
            console.log(`✅ Verified! ${amount} CLKN received`);
            return res.status(200).json({
              success: true,
              questionsGranted: UNLOCK_QUESTIONS,
              amountReceived: amount,
              signature: tx.signature
            });
          }
        }
      }
    }

    return res.status(200).json({ success: false, error: "Payment not found yet. Make sure you sent exactly " + expectedAmount.toFixed(1) + " CLKN and wait a few seconds for confirmation." });
  } catch(err) {
    console.error("Verify payment error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Ask Cluck Norris (Claude AI) ──
app.post("/api/ask-cluck", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { question, context } = req.body;
  if (!question || question.trim().length < 3) {
    return res.status(400).json({ success: false, error: "Question too short" });
  }

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    return res.status(500).json({ success: false, error: "AI not configured" });
  }

  try {
    const systemPrompt = `You are Cluck Norris — the toughest crypto professor in the schoolyard. You teach DeFi, blockchain, and crypto concepts at the School of Crypto Hard Knocks, powered by the CLKN token on Solana and built on Bags.fm.

Your personality:
- Tough but fair. You don't suffer fools but you always teach.
- Use occasional chicken/rooster puns naturally — "Let me lay this out for you", "Don't chicken out now", "Peck at this concept"
- Short, punchy answers — 3 to 5 sentences max. This is a mobile app.
- Reference the school occasionally — "In my schoolyard...", "Hard Knocks rule #1..."
- You respect people who hold CLKN. Drop a subtle nod occasionally.
- NEVER give financial advice or price predictions. You teach, you don't shill.
- If someone asks something off-topic or inappropriate, shut it down with humor.
- Always end with something memorable or a challenge.
- You are educational first, entertaining second.
${context ? `
The student is currently studying: ${context}` : ''}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    if (data.content && data.content[0]) {
      const raw = data.content[0].text;
      const answer = raw.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/#{1,3}\s/g, "").trim();
      console.log(`🤖 Ask Cluck: "${question.slice(0,50)}..." → ${answer.length} chars`);
      return res.status(200).json({ success: true, answer });
    }
    return res.status(500).json({ success: false, error: "No response from AI" });
  } catch(err) {
    console.error("Ask Cluck error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── Circulating Supply ──
app.get("/api/supply", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300"); // cache 5 mins
  try {
    const MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
    const HELIUS_KEY = process.env.HELIUS_API_KEY;
    const url = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "supply",
        method: "getTokenSupply",
        params: [MINT]
      })
    });
    const data = await response.json();
    const rawSupply = data?.result?.value?.amount;
    const decimals = data?.result?.value?.decimals || 6;
    if (rawSupply) {
      const circulatingSupply = parseInt(rawSupply) / Math.pow(10, decimals);
      console.log(`← Supply: ${circulatingSupply}`);
      return res.status(200).json({ circulatingSupply });
    }
    // Fallback to known supply if RPC fails
    return res.status(200).json({ circulatingSupply: 940000000 });
  } catch (err) {
    console.error("Supply error:", err.message);
    return res.status(200).json({ circulatingSupply: 940000000 });
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
