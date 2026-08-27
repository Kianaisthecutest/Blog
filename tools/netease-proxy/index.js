const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CACHE_TTL = 1000 * 60 * 60; // 1 hour
const cache = new Map();

function setCache(key, value) {
  cache.set(key, { value, ts: Date.now() });
}

function getCache(key) {
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() - e.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return e.value;
}

// Simple endpoint: /api/netease?id=1859652717
app.get('/api/netease', async (req, res) => {
  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'missing id' });

  const cached = getCache(id);
  if (cached) return res.json(cached);

  try {
    // Use api.imjad.cn as upstream (public cloudmusic proxy)
    const upstream = `https://api.imjad.cn/cloudmusic/?type=detail&id=${encodeURIComponent(id)}`;
    const r = await fetch(upstream, { timeout: 5000 });
    if (!r.ok) return res.status(502).json({ error: 'upstream status ' + r.status });
    const data = await r.json();
    setCache(id, data);
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'fetch error', detail: String(e) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`netease-proxy listening on http://localhost:${port}`));
