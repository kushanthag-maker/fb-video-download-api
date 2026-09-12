export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const fbUrl = req.query.url;
  if (!fbUrl) {
    return res.status(400).json({
      success: false,
      error: 'url param missing',
      use: '/api/download?url=FB_URL'
    });
  }

  let targetUrl = fbUrl.replace('www.facebook.com', 'm.facebook.com');
  try {
    const r = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
      }
    });
    const html = await r.text();
    const get = (re) => { const m = html.match(re); return m? m[1] : null; };

    let hd = get(/"browser_native_hd_url":"([^"]+)"/) || get(/"playable_url_quality_hd":"([^"]+)"/);
    let sd = get(/"browser_native_sd_url":"([^"]+)"/) || get(/"playable_url":"([^"]+)"/);

    const clean = (s) => { try { return JSON.parse(`"${s}"`); } catch { return s; } };
    hd = clean(hd); sd = clean(sd);

    if (!hd &&!sd) {
      return res.json({ success: false, error: 'Public video ekak nemei, private da?' });
    }

    return res.json({
      success: true,
      download_links: { hd, sd, best: hd || sd },
      direct_download_url: hd || sd
    });
  } catch(e){
    return res.status(500).json({ success:false, error: e.message });
  }
}
