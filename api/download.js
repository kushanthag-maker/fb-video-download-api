import { getFbVideoInfo } from "fbdl-core";
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const fbUrl = req.query.url;
  if (!fbUrl) return res.status(400).json({ success:false });
  try {
    const info = await getFbVideoInfo(fbUrl);
    return res.json({
      success: true,
      download_links: { hd: info.hd, sd: info.sd, best: info.hd || info.sd },
      direct_download_url: info.hd || info.sd
    });
  } catch (e) {
    return res.status(500).json({ success:false, error: e.message });
  }
}
