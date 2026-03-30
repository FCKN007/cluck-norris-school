import { BagsSDK } from "@bagsfm/bags-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(process.env.SOLANA_RPC_URL);
const sdk = new BagsSDK(process.env.BAGS_API_KEY, connection, "processed");

const BASE_URL = "https://public-api-v2.bags.fm/api/v1/";

export default async function handler(req, res) {
  try {
    const { type, mint, endpoint, ...rest } = req.query;

    // =============================
    // 🔥 SDK ROUTES
    // =============================
    if (type === "fees") {
      const fees = await sdk.state.getTokenLifetimeFees(new PublicKey(mint));
      return res.status(200).json({
        success: true,
        response: {
          feesSOL: fees / 1_000_000_000,
        },
      });
    }

    if (type === "creators") {
      const creators = await sdk.state.getTokenCreators(new PublicKey(mint));
      return res.status(200).json({
        success: true,
        response: creators,
      });
    }

    // =============================
    // 🌐 REST ROUTES (FIXED CORRECTLY)
    // =============================
    if (endpoint) {
      // 🔥 Build query string from remaining params
      const queryString = new URLSearchParams(rest).toString();

      const fullUrl = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

      console.log("BAGS FULL URL:", fullUrl);

      const response = await fetch(fullUrl, {
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
