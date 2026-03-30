import { useState, useEffect } from "react";

const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";
const BAGS_BASE_URL = "/api/bags-proxy?endpoint=";
const SOL_MINT = "So11111111111111111111111111111111111111112";
const LAMPORTS_PER_SOL = 1_000_000_000;

// ✅ SAFE FETCH (proxy → fallback)
async function safeFetch(endpoint) {
  try {
    const res = await fetch(`${BAGS_BASE_URL}${endpoint}`);
    const data = await res.json();
    if (data?.success) return data;
  } catch (e) {
    console.log("Proxy failed, trying direct...");
  }

  try {
    const res = await fetch(`https://bags.fm/api/${endpoint}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Both API attempts failed");
    return null;
  }
}

// 🔥 TICKER
function CLKNTicker() {
  const [fees, setFees] = useState(null);

  useEffect(() => {
    async function fetchFees() {
      const data = await safeFetch(
        `analytics/token-lifetime-fees?tokenMint=${CLKN_MINT}`
      );
      if (data?.success) setFees(data.response);
    }

    fetchFees();
    const i = setInterval(fetchFees, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ marginBottom: 10 }}>
      {fees ? `CLKN Fees: ${fees.totalFeesSol} SOL` : "Loading CLKN data..."}
    </div>
  );
}

// 🔥 MAIN WIDGET
function CLKNWidget() {
  const [pool, setPool] = useState(null);
  const [fees, setFees] = useState(null);
  const [quote, setQuote] = useState(null);

  async function fetchData() {
    const [poolData, feesData] = await Promise.all([
      safeFetch(`solana/bags/pools/token-mint?tokenMint=${CLKN_MINT}`),
      safeFetch(`analytics/token-lifetime-fees?tokenMint=${CLKN_MINT}`)
    ]);

    if (poolData?.success) setPool(poolData.response);
    if (feesData?.success) setFees(feesData.response);
  }

  async function fetchQuote(sol) {
    const lamports = Math.floor(sol * LAMPORTS_PER_SOL);

    const data = await safeFetch(
      `trade/quote?inputMint=${SOL_MINT}&outputMint=${CLKN_MINT}&amount=${lamports}&slippageMode=auto`
    );

    if (data?.success) setQuote(data.response);
  }

  useEffect(() => {
    fetchData();
    fetchQuote(1);
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>CLKN Dashboard</h3>

      {fees && (
        <div>
          <p>Total Fees: {fees.totalFeesSol} SOL</p>
          <p>Claimed: {fees.claimedFeesSol} SOL</p>
        </div>
      )}

      {quote && (
        <div>
          <p>1 SOL → {parseInt(quote.outAmount / 1e6)} CLKN</p>
        </div>
      )}

      {pool && <p>Pool Loaded ✅</p>}
    </div>
  );
}

// 🔥 LESSONS (UNCHANGED)
const LESSONS = [
  {
    id: "lp",
    title: "Liquidity Pools",
    belt: "White Belt",
    intro: "Liquidity Pools power decentralized trading.",
    questions: [
      {
        q: "What do liquidity providers earn?",
        options: ["Free NFTs", "Trading fees", "Nothing", "Dev rewards"],
        correct: 1
      }
    ]
  },
  {
    id: "rugs",
    title: "Rug Pulls",
    belt: "Yellow Belt",
    intro: "Rugs happen when devs remove liquidity or dump.",
    questions: [
      {
        q: "What is a rug pull?",
        options: ["Price pump", "Liquidity removal", "Airdrop", "Staking reward"],
        correct: 1
      }
    ]
  }
];

// 🔥 APP
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  const completeLesson = () => {
    setProgress((p) => p + 1);
    setScreen("result");
  };

  return (
    <div style={{ padding: 20 }}>
      <CLKNTicker />
      <CLKNWidget />

      {screen === "landing" && (
        <div>
          <h1>🐔 Cluck Norris Dojo</h1>
          <button onClick={() => setScreen("select")}>Begin</button>
        </div>
      )}

      {screen === "select" && (
        <div>
          {LESSONS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLesson(l);
                setScreen("lesson");
              }}
            >
              {l.title}
            </button>
          ))}
        </div>
      )}

      {screen === "lesson" && lesson && (
        <div>
          <h2>{lesson.title}</h2>
          <button onClick={() => setScreen("quiz")}>Quiz</button>
        </div>
      )}

      {screen === "quiz" && lesson && (
        <div>
          <h3>{lesson.questions[0].q}</h3>
          {lesson.questions[0].options.map((opt, i) => (
            <button key={i} onClick={completeLesson}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {screen === "result" && (
        <div>
          <h2>Complete</h2>
          <button onClick={() => setScreen("select")}>Continue</button>
        </div>
      )}
    </div>
  );
}
