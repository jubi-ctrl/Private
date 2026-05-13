export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);
  const url = `https://data.moa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Upstream ${response.status}`);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
