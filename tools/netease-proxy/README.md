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
