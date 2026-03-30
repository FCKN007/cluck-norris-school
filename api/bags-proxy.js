import { BagsSDK } from "@bagsfm/bags-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const BASE_URL = "https://public-api-v2.bags.fm/api/v1/";

export default async function handler(req, res) {
  try {
    // 🔍 DEBUG ENV (helps immediately)
    if (!process.env.BAGS_API_KEY || !process.env.SOLANA_RPC_URL) {
      return res.status(500).json({
        success: false,
        error: "Missing environment variables",
        debug: {
          hasApiKey: !!process.env.BAGS_API_KEY,
          hasRpc: !!process.env.SOLANA_RPC_URL,
        },
      });
    }

    const connection = new Connection(process.env.SOLANA_RPC_URL);
    const sdk = new BagsSDK(process.env.BAGS_API_KEY, connection, "processed");

    const { type, mint, endpoint } = req.query;

    // =============================
    // 🔥 SDK ROUTES
    // =============================
    if (type === "fees") {
      if (!mint) {
        return res.status(400).json({
          success: false,
          error: "Missing mint address",
        });
      }

      const fees = await sdk.state.getTokenLifetimeFees(new PublicKey(mint));

      return res.status(200).json({
        success: true,
        response: {
          feesSOL: fees / 1_000_000_000,
        },
      });
    }

    if (type === "creators") {
      if (!mint) {
        return res.status(400).json({
          success: false,
          error: "Missing mint address",
        });
      }

      const creators = await sdk.state.getTokenCreators(new PublicKey(mint));

      return res.status(200).json({
        success: true,
        response: creators,
      });
    }

    // =============================
    // 🌐 REST ROUTES
    // =============================
    if (endpoint) {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          "x-api-key": process.env.BAGS_API_KEY,
        },
      });

      const data = await response.json();

      if (!data.success) {
        return res.status(response.status).json({
          success: false,
          error: data.error,
        });
      }

      return res.status(200).json(data);
    }

    return res.status(400).json({
      success: false,
      error: "Missing type or endpoint",
    });

  } catch (error) {
    console.error("🚨 Bags Proxy Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
