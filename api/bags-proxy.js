export default async function handler(req, res) {
  try {
    const { endpoint, tokenMint } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: "Missing endpoint" });
    }

    const url = `https://bags.fm/api/${endpoint}?tokenMint=${tokenMint}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
