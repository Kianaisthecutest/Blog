// Default proxy config for local testing.
// Leave unset by default so the player falls back to the embedded iframe when
// no proxy is actually running. To enable the proxy, set this to your proxy URL,
// for example in production you'd inject: window.NETEASE_PROXY_URL = 'https://proxy.example.com'
window.NETEASE_PROXY_URL = window.NETEASE_PROXY_URL || null;
