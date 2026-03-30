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
    const url = `https://bags.fm/api/${endpoint}?${queryString}`;

    console.log("Calling:", url);

    // ✅ IMPORTANT FIX: use dynamic import for fetch
    const fetchFn = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));

    const response = await fetchFn(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const text = await response.text();

    return res.status(200).send({
      status: response.status,
      url,
      response: text,
    });

  } catch (error) {
    console.error("🔥 PROXY CRASH:", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
}
