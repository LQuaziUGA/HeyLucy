const cors = require("cors")({ origin: true });
const { onRequest } = require("firebase-functions/v2/https");

exports.myhealthfinderProxy = onRequest({ region: "us-central1" }, (req, res) => {
  cors(req, res, async () => {
    try {
      const type = req.query.type || "topic";
      const url = `https://odphp.health.gov/myhealthfinder/api/v4/itemlist.json?Type=${encodeURIComponent(
        type
      )}`;

      const response = await fetch(url);
      if (!response.ok) {
        res.status(502).json({ error: "Upstream MyHealthfinder error" });
        return;
      }

      const data = await response.json();
      res.set("Cache-Control", "public, max-age=3600");
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Proxy error", detail: String(err) });
    }
  });
});
