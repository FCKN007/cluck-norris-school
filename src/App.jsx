import { useState, useEffect } from "react";

const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";

// 🔥 SAFE FETCH (proxy → fallback to public endpoint)
async function fetchBagsData() {
  try {
    const res = await fetch(
      `/api/bags-proxy?endpoint=analytics/token-lifetime-fees&tokenMint=${CLKN_MINT}`
    );
    const data = await res.json();
    if (data?.success) return data.response;
  } catch (e) {
    console.log("Proxy failed, trying public endpoint...");
  }

  try {
    const res = await fetch(
      `https://bags.fm/api/analytics/token-lifetime-fees?tokenMint=${CLKN_MINT}`
    );
    const data = await res.json();
    return data?.response || data;
  } catch (e) {
    console.error("All API attempts failed");
    return null;
  }
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  const [fees, setFees] = useState(null);
  const [apiStatus, setApiStatus] = useState("Connecting...");

  useEffect(() => {
    async function loadData() {
      const data = await fetchBagsData();

      if (data) {
        setFees(data);
        setApiStatus("Bags API Connected ✅");
      } else {
        setApiStatus("Using Public Data ⚠️");
      }
    }

    loadData();
  }, []);

  const LESSONS = [
    {
      id: "lp",
      title: "Liquidity Pools",
      belt: "White Belt",
      intro: "Liquidity Pools power decentralized trading.",
      questions: [
        {
          q: "What do liquidity providers earn?",
          options: [
            "Free NFTs",
            "Trading fees",
            "Nothing",
            "Dev rewards"
          ],
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
          options: [
            "Price pump",
            "Liquidity removal",
            "Airdrop",
            "Staking reward"
          ],
          correct: 1
        }
      ]
    }
  ];

  const completeLesson = () => {
    setProgress((prev) => prev + 1);
    setScreen("result");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0C0C0C",
        color: "#F9FAFB",
        padding: 20,
        fontFamily: "Arial"
      }}
    >
      {/* 🔥 API STATUS */}
      <div style={{ marginBottom: 10 }}>
        <strong>{apiStatus}</strong>
      </div>

      {/* 🔐 API PANEL */}
      <div
        style={{
          background: "rgba(217,119,6,0.08)",
          border: "1px solid rgba(217,119,6,0.3)",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          maxWidth: 520
        }}
      >
        <div
          style={{
            fontFamily: "'Oswald',sans-serif",
            fontSize: 10,
            letterSpacing: 3,
            color: "#D97706",
            marginBottom: 10
          }}
        >
          🔐 BAGS API ACCESS
        </div>

        <div style={{ fontSize: 12, color: "#E5E7EB", lineHeight: 1.5 }}>
          <p><strong>Cluck Norris says:</strong> Secure your keys or get wrecked.</p>

          <ol style={{ paddingLeft: 16 }}>
            <li>Go to dev.bags.fm</li>
            <li>Create a new API key</li>
            <li>Name it (Production / Dev / Mobile)</li>
            <li>Store it securely (never public)</li>
          </ol>

          <p style={{ marginTop: 10, color: "#FCD34D" }}>
            ⚠️ Max 10 keys per account • Revoke instantly if compromised
          </p>

          <p style={{ marginTop: 8, fontSize: 11, color: "#9CA3AF" }}>
            App currently uses public endpoints. Full v2 API integration ready when key access is enabled.
          </p>
        </div>
      </div>

      {/* 🔥 FEES DISPLAY */}
      {fees && (
        <div style={{ marginBottom: 20 }}>
          <h3>🔥 CLKN Lifetime Fees</h3>
          <p>Total: {fees.totalFeesSol ?? "—"} SOL</p>
          <p>Claimed: {fees.claimedFeesSol ?? "—"} SOL</p>
          <p>Unclaimed: {fees.unclaimedFeesSol ?? "—"} SOL</p>
        </div>
      )}

      {/* LANDING */}
      {screen === "landing" && (
        <div style={{ textAlign: "center" }}>
          <h1>🐔 Cluck Norris Dojo</h1>
          <p>School of Crypto Hard Knocks</p>

          <button onClick={() => setScreen("select")}>
            Begin Training
          </button>
        </div>
      )}

      {/* SELECT */}
      {screen === "select" && (
        <div>
          <h2>Select Your Lesson</h2>
          <p>
            Progress: {progress} / {LESSONS.length}
          </p>

          {LESSONS.map((l) => (
            <button
              key={l.id}
              style={{ display: "block", margin: "10px 0" }}
              onClick={() => {
                setLesson(l);
                setScreen("lesson");
              }}
            >
              {l.title} ({l.belt})
            </button>
          ))}
        </div>
      )}

      {/* LESSON */}
      {screen === "lesson" && lesson && (
        <div>
          <h2>{lesson.title}</h2>
          <p>{lesson.intro}</p>

          <button onClick={() => setScreen("quiz")}>
            Take Quiz
          </button>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && lesson && (
        <div>
          <h3>{lesson.questions[0].q}</h3>

          {lesson.questions[0].options.map((opt, i) => (
            <button
              key={i}
              style={{ display: "block", margin: "10px 0" }}
              onClick={completeLesson}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && (
        <div style={{ textAlign: "center" }}>
          <h2>🏆 Lesson Complete</h2>
          <p>Cluck Norris approves.</p>

          <button onClick={() => setScreen("select")}>
            Continue Training
          </button>
        </div>
      )}
    </div>
  );
}
