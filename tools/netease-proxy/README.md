# NetEase Metadata Proxy

This small Express app provides a simple server-side proxy to fetch and cache NetEase CloudMusic metadata (wrapping `api.imjad.cn/cloudmusic`). It helps avoid browser CORS issues and centralizes caching.

Quick start

1. Install dependencies:

```bash
cd tools/netease-proxy
npm install
```

2. Run the server locally:

```bash
npm start
```

3. API

- `GET /api/netease?id=<songId>` — returns the JSON from the upstream API, cached for 1 hour by default.

Usage from frontend

Point the frontend to your deployed proxy, e.g. `https://yourhost.com/api/netease?id=1859652717` instead of `https://api.imjad.cn/...`.

Notes

- This proxy simply forwards the upstream response and caches it in memory. For production, consider persistent caching (Redis), rate limiting, and proper error handling.
- Make sure the host running this proxy can access the public internet.
