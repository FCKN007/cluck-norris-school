import { useState, useEffect } from "react";

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

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [apiStatus, setApiStatus] = useState("Loading...");

  // SAFE API CALL (no eval, no CSP issues)
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/ping")
      .then((res) => res.json())
      .then(() => setApiStatus("API Connected ✅"))
      .catch(() => setApiStatus("API Failed ❌"));
  }, []);

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
      <h4>{apiStatus}</h4>

      {screen === "landing" && (
        <div style={{ textAlign: "center" }}>
          <h1>🐔 Cluck Norris Dojo</h1>
          <p>School of Crypto Hard Knocks</p>
          <button onClick={() => setScreen("select")}>
            Begin Training
          </button>
        </div>
      )}

      {screen === "select" && (
        <div>
          <h2>Select Your Lesson</h2>
          <p>Progress: {progress} / {LESSONS.length}</p>

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

      {screen === "lesson" && lesson && (
        <div>
          <h2>{lesson.title}</h2>
          <p>{lesson.intro}</p>

          <button onClick={() => setScreen("quiz")}>
            Take Quiz
          </button>
        </div>
      )}

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
