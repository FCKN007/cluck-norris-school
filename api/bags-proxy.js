export default async function handler(req, res) {
  try {
    const API_KEY = process.env.BAGS_API_KEY;

    if (!API_KEY) {
      return res.status(401).json({
        success: false,
        error: "Missing API key"
      });
    }

    // Simulated response (for now)
    return res.status(200).json({
      success: true,
      response: {
        fees: 12450,
        volume: 88234,
        price: 0.000042
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred"
    });
  }
}
