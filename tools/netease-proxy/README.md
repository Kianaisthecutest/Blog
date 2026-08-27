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

Redis caching & rate limiting
-----------------------------

This proxy supports optional Redis-based caching and includes a basic rate limiter.

- To enable Redis caching, set `REDIS_URL` before starting the proxy, for example:

```bash
export REDIS_URL=redis://:password@127.0.0.1:6379/0
node index.js
```

The proxy will then cache `/api/netease?id=...` responses in Redis for 1 hour.

- The proxy applies a simple rate limit to `/api/netease` and `/stream` endpoints (default: 120 requests/min per IP). Adjust or replace the limiter in `index.js` as needed for production.

CI / Container Registry (GitHub Actions)
-------------------------------------

This repository includes a GitHub Actions workflow that automatically builds and publishes the `netease-proxy` Docker image when you push to the `main` branch.

- The workflow file: `.github/workflows/netease-proxy-image.yml`.
- By default it pushes to GitHub Container Registry (GHCR) under `ghcr.io/<your-github-org-or-user>/netease-proxy:latest`.
- Optionally it can also push to Docker Hub if you add the following repository secrets in GitHub: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.

How to use:

1. Merge your branch into `main` (or push directly to `main`) to trigger the workflow.
2. The action will produce images in GHCR; you can pull with:

```bash
docker pull ghcr.io/<your-github-username>/netease-proxy:latest
```

3. Optional: to push to Docker Hub, create repo secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` and the workflow will push `DOCKERHUB_USERNAME/netease-proxy:latest`.

Notes:
- Ensure GitHub Packages/CR settings in your account allow package publishing; the default `GITHUB_TOKEN` is used for authentication.
- If you prefer only Docker Hub, you can edit the workflow to skip GHCR steps and push directly to Docker Hub instead.

Deployment: nginx + Certbot (自动 HTTPS)
--------------------------------------

下面给出一个简单的一键脚本，适用于 Debian/Ubuntu 系统，用来安装 `nginx`、`certbot` 并为你的域名申请 TLS 证书，同时把请求反向代理到本地运行的 `netease-proxy`（默认监听 `127.0.0.1:4000`）。脚本位置：`tools/netease-proxy/deploy/setup_nginx_certbot.sh`。

示例使用（在服务器上以 root 或 sudo 运行）：

```bash
cd tools/netease-proxy/deploy
sudo bash setup_nginx_certbot.sh --domain proxy.example.com --email admin@example.com
```

脚本做的事情：
- 安装 `nginx` 和 `certbot`（apt 包），
- 在 `/etc/nginx/sites-available/` 创建基于 `${DOMAIN}` 的站点配置，将 `/` 转发到 `http://127.0.0.1:4000`，
- 使用 `certbot` 为域名申请 Let's Encrypt 证书并配置 HTTPS。

如果你更喜欢使用 Docker 部署（推荐容器化），可以先使用本仓库的 `docker-compose.yml` 启动 `netease-proxy`，然后把域名代理到宿主机的 `4000` 端口，或使用 nginx/Traefik 作为全局反向代理并在其上启用 TLS。

安全建议：对外暴露 proxy 接口时，请考虑加入访问控制（IP 白名单、简单密钥或反向代理认证），并为生产环境使用持久化缓存（Redis）和速率限制，避免滥用。
