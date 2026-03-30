export default async function handler(req, res) {
  try {
    const API_KEY = process.env.BAGS_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "Missing API key" });
    }

    const { endpoint, ...params } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: "Missing endpoint" });
    }

    const queryString = new URLSearchParams(params).toString();

    // ✅ CORRECT BASE URL
    const url = `https://public-api-v2.bags.fm/api/v1/${endpoint}?${queryString}`;

    console.log("Calling:", url);

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY
      }
    });

    const text = await response.text();

    return res.status(200).send({
      status: response.status,
      url,
      response: text
    });

  } catch (error) {
    console.error("🔥 PROXY ERROR:", error);
    return res.status(500).json({
      error: error.message
    });
  }
}
