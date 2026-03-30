import { useEffect, useState } from "react";

const CLKN_MINT = "DW6DF2mjtyx67vcNmMhFm9XdxAwREurorghZcS3CBAGS";

export default function App() {
  const [fees, setFees] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch(
        `/api/bags-proxy?type=fees&mint=${CLKN_MINT}`
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!data.success) {
        setError(data.error || "API error");
        return;
      }

      setFees(data.response.feesSOL);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Network error");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🐔 Cluck Norris</h1>

      <div style={styles.card}>
        <h2>💰 Lifetime Fees</h2>

        {error && <p style={styles.error}>{error}</p>}

        {!error && fees === null && <p>Loading...</p>}

        {!error && fees !== null && (
          <p style={styles.value}>{fees.toFixed(2)} SOL</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  card: {
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  value: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#22c55e",
  },
  error: {
    color: "#ef4444",
  },
};
