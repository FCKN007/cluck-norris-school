export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const { endpoint, ...params } = req.query;
  if (!endpoint) { res.status(400).json({ error: "Missing endpoint" }); return; }

  const query = new URLSearchParams(params).toString();
  const url = `https://public-api-v2.bags.fm/api/v1/${endpoint}${query ? "?" + query : ""}`;

  try {
    const response = await fetch(url, {
      headers: { "x-api-key": process.env.BAGS_API_KEY },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy error", detail: e.message });
  }
}
