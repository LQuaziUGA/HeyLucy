const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 60;
const rateBuckets = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_WINDOW_MS;
  }
  bucket.count += 1;
  rateBuckets.set(ip, bucket);
  return bucket.count <= RATE_MAX;
}

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    const ip =
      (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';
    if (!rateLimit(ip)) {
      res.status(429).json({ error: 'Rate limit exceeded' });
      return;
    }

    const endpoint = (req.query.endpoint || 'itemlist').toString();
    const age = req.query.age ? `&Age=${encodeURIComponent(req.query.age)}` : '';
    const sexValue = req.query.sex ? req.query.sex : 'female';
    const sex = `&Sex=${encodeURIComponent(sexValue)}`;
    const pregnant = req.query.pregnant ? `&Pregnant=${encodeURIComponent(req.query.pregnant)}` : '';
    const keyword = req.query.keyword ? `&Keyword=${encodeURIComponent(req.query.keyword)}` : '';

    let url = '';
    if (endpoint === 'itemlist') {
      const type = req.query.type || 'topic';
      url = `https://odphp.health.gov/myhealthfinder/api/v4/itemlist.json?Type=${encodeURIComponent(
        type
      )}${age}${sex}${pregnant}${keyword}`;
    } else if (endpoint === 'topicsearch') {
      const topicId = req.query.topicId;
      if (!topicId) {
        res.status(400).json({ error: 'Missing topicId' });
        return;
      }
      url = `https://odphp.health.gov/myhealthfinder/api/v4/topicsearch.json?TopicId=${encodeURIComponent(
        topicId
      )}${age}${sex}${pregnant}${keyword}`;
    } else if (endpoint === 'searchbykeyword') {
      if (!req.query.keyword) {
        res.status(400).json({ error: 'Missing keyword' });
        return;
      }
      url = `https://odphp.health.gov/myhealthfinder/api/v4/searchbykeyword.json?Keyword=${encodeURIComponent(
        req.query.keyword
      )}${age}${sex}${pregnant}`;
    } else if (endpoint === 'healthfinder') {
      const healthTopicId = req.query.healthTopicId;
      if (!healthTopicId) {
        res.status(400).json({ error: 'Missing healthTopicId' });
        return;
      }
      url = `https://odphp.health.gov/myhealthfinder/api/v4/healthfinder.json?HealthTopicId=${encodeURIComponent(
        healthTopicId
      )}${age}${sex}${pregnant}`;
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
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: String(err) });
  }
}
