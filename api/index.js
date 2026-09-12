export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: "Working ✅",
    endpoints: {
      json: "/api/download?url=FB_URL",
      direct: "/api/direct?url=FB_URL"
    },
    example: "/api/download?url=https://www.facebook.com/watch/?v=123"
  });
}
