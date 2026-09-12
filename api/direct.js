export default async function handler(req, res){
  const fbUrl = req.query.url;
  if(!fbUrl) return res.status(400).send('?url=FB_URL needed');

  const host = req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const apiUrl = `${proto}://${host}/api/download?url=${encodeURIComponent(fbUrl)}`;

  const r = await fetch(apiUrl);
  const data = await r.json();
  const best = data.download_links?.best;

  if(best){ res.redirect(302, best); }
  else { res.status(404).json(data); }
}
