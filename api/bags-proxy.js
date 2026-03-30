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

    // Build query string dynamically
    const queryString = new URLSearchParams(params).toString();

    const url = `https://bags.fm/api/${endpoint}?${queryString}`;

    console.log("Calling URL:", url);

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY
      }
    });

    const text = await response.text();

    console.log("Raw response:", text);

    try {
      const data = JSON.parse(text);
      res.status(response.status).json(data);
    } catch {
      res.status(response.status).send(text);
    }

  } catch (error) {
    console.error("🔥 PROXY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
