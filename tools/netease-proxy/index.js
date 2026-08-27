const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { createClient } = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const CACHE_TTL = 1000 * 60 * 60; // 1 hour (ms)
const cache = new Map();

// Optional Redis client (enable by setting REDIS_URL env)
let redisClient = null;
const REDIS_URL = process.env.REDIS_URL || null;
if (REDIS_URL) {
  redisClient = createClient({ url: REDIS_URL });
  redisClient.connect().then(() => console.log('redis connected')).catch((e) => console.error('redis connect failed', e));
}

async function setCache(key, value) {
  if (redisClient) {
    try {
      await redisClient.setEx(key, Math.floor(CACHE_TTL / 1000), JSON.stringify(value));
      return;
    } catch (e) {
      // fallback to memory
    }
  }
  cache.set(key, { value, ts: Date.now() });
}

async function getCache(key) {
  if (redisClient) {
    try {
      const v = await redisClient.get(key);
      if (!v) return null;
      return JSON.parse(v);
    } catch (e) {
      // fallback to memory
    }
  }
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() - e.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return e.value;
}

// basic rate limiter for API endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/api/netease', '/stream'], apiLimiter);

// Simple endpoint: /api/netease?id=1859652717
app.get('/api/netease', async (req, res) => {
  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'missing id' });

  const cached = await getCache(id);
  if (cached) return res.json(cached);

  try {
    // Use api.imjad.cn as upstream (public cloudmusic proxy)
    const upstream = `https://api.imjad.cn/cloudmusic/?type=detail&id=${encodeURIComponent(id)}`;
    const r = await fetch(upstream, { timeout: 5000 });
    if (!r.ok) return res.status(502).json({ error: 'upstream status ' + r.status });
    const data = await r.json();
    await setCache(id, data);
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'fetch error', detail: String(e) });
  }
});

// Stream proxy for NetEase audio. Endpoint: /stream?id=<songId>
app.get('/stream', async (req, res) => {
  const id = String(req.query.id || '');
  if (!id) return res.status(400).json({ error: 'missing id' });

  try {
    // NetEase outer url pattern that often serves mp3 redirects
    const upstream = `https://music.163.com/song/media/outer/url?id=${encodeURIComponent(id)}`;
    const r = await fetch(upstream, { redirect: 'follow', timeout: 10000 });
    if (!r.ok) {
      return res.status(502).json({ error: 'upstream status ' + r.status });
    }

    // Pass through important headers
    const contentType = r.headers.get('content-type') || 'audio/mpeg';
    const contentLength = r.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Stream the response body to client
    const body = r.body;
    if (!body) return res.status(502).end();
    body.pipe(res);
  } catch (e) {
    res.status(502).json({ error: 'fetch error', detail: String(e) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`netease-proxy listening on http://localhost:${port}`));
