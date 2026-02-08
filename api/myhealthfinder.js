export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    const endpoint = (req.query.endpoint || 'itemlist').toString();
    const lang = req.query.lang ? `&Lang=${encodeURIComponent(req.query.lang)}` : '';

    let url = '';
    if (endpoint === 'itemlist') {
      const type = req.query.type || 'topic';
      url = `https://odphp.health.gov/myhealthfinder/api/v4/itemlist.json?Type=${encodeURIComponent(
        type
      )}${lang}`;
    } else if (endpoint === 'topicsearch') {
      const topicId = req.query.topicId;
      if (!topicId) {
        res.status(400).json({ error: 'Missing topicId' });
        return;
      }
      url = `https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json?TopicId=${encodeURIComponent(
        topicId
      )}${lang}`;
    } else {
      res.status(400).json({ error: 'Unsupported endpoint' });
      return;
    }

    const response = await fetch(url);
    if (!response.ok) {
      res.status(502).json({ error: 'Upstream MyHealthfinder error' });
      return;
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: String(err) });
  }
}
