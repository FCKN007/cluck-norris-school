import { BagsSDK } from "@bagsfm/bags-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const BASE_URL = "https://public-api-v2.bags.fm/api/v1/";

let sdk = null;

function getSDK() {
  if (!sdk) {
    if (!process.env.SOLANA_RPC_URL || !process.env.BAGS_API_KEY) {
      throw new Error("Missing ENV vars");
    }
    const connection = new Connection(process.env.SOLANA_RPC_URL);
    sdk = new BagsSDK(process.env.BAGS_API_KEY, connection, "processed");
  }
  return sdk;
}

export default async function handler(req, res) {
  try {
    const { type, mint, endpoint, ...rest } = req.query;

    // =============================
    // 🔥 SDK ROUTES (SAFE)
    // =============================
    if (type === "fees") {
      try {
        const sdk = getSDK();
        const fees = await sdk.state.getTokenLifetimeFees(new PublicKey(mint));

        return res.status(200).json({
          success: true,
          response: {
            feesSOL: fees / 1_000_000_000,
          },
        });
      } catch (err) {
        console.error("SDK FEES ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "Fees fetch failed",
        });
      }
    }

    if (type === "creators") {
      try {
        const sdk = getSDK();
        const creators = await sdk.state.getTokenCreators(new PublicKey(mint));

        return res.status(200).json({
          success: true,
          response: creators,
        });
      } catch (err) {
        console.error("SDK CREATORS ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "Creators fetch failed",
        });
      }
    }

    // =============================
    // 🌐 REST ROUTES (SAFE)
    // =============================
    if (endpoint) {
      try {
        const queryString = new URLSearchParams(rest).toString();
        const fullUrl = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

        console.log("BAGS URL:", fullUrl);

        const response = await fetch(fullUrl, {
          headers: {
            "x-api-key": process.env.BAGS_API_KEY,
          },
        });

        const data = await response.json();

        console.log("BAGS RESPONSE:", data);

        if (!data.success) {
          return res.status(response.status || 400).json({
            success: false,
            error: data.error || "Unknown API error",
          });
        }

        return res.status(200).json(data);

      } catch (err) {
        console.error("REST ROUTE ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "REST fetch failed",
        });
      }
    }

    return res.status(400).json({
      success: false,
      error: "Missing type or endpoint",
    });

  } catch (error) {
    console.error("🚨 GLOBAL PROXY ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
