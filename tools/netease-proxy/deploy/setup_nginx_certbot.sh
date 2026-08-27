#!/usr/bin/env bash
set -euo pipefail

# setup_nginx_certbot.sh
# 使用方法: sudo ./setup_nginx_certbot.sh --domain example.com --email you@example.com
# 脚本功能:
# - 在 Debian/Ubuntu 上安装 nginx 和 certbot (apt 方案)
# - 生成 nginx 反向代理配置，将 / 转发到 http://127.0.0.1:4000
# - 使用 certbot 为域名申请并自动配置 TLS (Let’s Encrypt)

usage() {
  cat <<EOF
Usage: sudo $0 --domain <domain> --email <email>

Options:
  --domain  域名 (必选)，例如 proxy.example.com
  --email   用于 Let's Encrypt 的联系邮箱 (必选)
  --help    显示本帮助

示例:
  sudo $0 --domain proxy.example.com --email admin@example.com
EOF
}

DOMAIN=""
EMAIL=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2;;
    --email) EMAIL="$2"; shift 2;;
    --help) usage; exit 0;;
    *) echo "Unknown arg: $1"; usage; exit 1;;
  esac
done

if [[ -z "$DOMAIN" || -z "$EMAIL" ]]; then
  echo "--domain and --email are required"
  usage
  exit 1
fi

if [[ $(id -u) -ne 0 ]]; then
  echo "Please run as root (sudo)"
  exit 1
fi

echo "[1/6] Updating apt repositories"
apt-get update -y

echo "[2/6] Installing nginx and certbot (apt packages)"
apt-get install -y nginx certbot python3-certbot-nginx

echo "[3/6] Creating nginx site configuration for ${DOMAIN}"
NGINX_CONF_PATH="/etc/nginx/sites-available/netease-proxy-${DOMAIN}"
WEBROOT_DIR="/var/www/letsencrypt"
mkdir -p "$WEBROOT_DIR"

cat > "$NGINX_CONF_PATH" <<NGINX_CONF
server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root ${WEBROOT_DIR};
    }

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
    }
}
NGINX_CONF

ln -sf "$NGINX_CONF_PATH" /etc/nginx/sites-enabled/netease-proxy-${DOMAIN}

echo "[4/6] Testing and reloading nginx"
nginx -t
systemctl reload nginx || systemctl restart nginx

echo "[5/6] Obtaining TLS certificate with certbot"
# Try certbot nginx plugin first (auto config). Falls back to webroot if plugin not available.
if certbot --version >/dev/null 2>&1; then
  if certbot -h | grep -q "--nginx"; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL"
  else
    certbot certonly --webroot -w "$WEBROOT_DIR" -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL"
    # create basic https server block
    SSL_CONF_PATH="/etc/nginx/sites-available/netease-proxy-${DOMAIN}-ssl"
    cat > "$SSL_CONF_PATH" <<SSL_CONF
server {
    listen 443 ssl;
    server_name ${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
SSL_CONF
    ln -sf "$SSL_CONF_PATH" /etc/nginx/sites-enabled/netease-proxy-${DOMAIN}-ssl
    nginx -t
    systemctl reload nginx
  fi
else
  echo "certbot not found after install; please install certbot and run again"
  exit 1
fi

echo "[6/6] Done. Access your proxy at: https://${DOMAIN}"

echo "If you are running containerized netease-proxy, make sure it is listening on 127.0.0.1:4000 or update the proxy_pass destination in /etc/nginx/sites-available/netease-proxy-${DOMAIN}."
