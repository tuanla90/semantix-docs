// OAuth proxy cho Decap CMS (GitHub backend) — deploy trên Railway.
// Env vars (Railway → Variables): GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.
// Node 18+ (có sẵn fetch). Chạy: npm start.
import http from 'node:http';

const CID = process.env.GITHUB_CLIENT_ID;
const SECRET = process.env.GITHUB_CLIENT_SECRET;
const PORT = process.env.PORT || 3000;
const GH = 'https://github.com/login/oauth';

const base = (req) => {
  const proto = req.headers['x-forwarded-proto'] || 'http';       // Railway đứng sau proxy https
  return `${proto}://${req.headers.host}`;
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, base(req));
    if (url.pathname === '/auth') {
      const p = new URLSearchParams({
        client_id: CID,
        redirect_uri: `${base(req)}/callback`,
        scope: 'repo,user',
        state: Math.random().toString(36).slice(2),
      });
      res.writeHead(302, { Location: `${GH}/authorize?${p}` });
      return res.end();
    }
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const r = await fetch(`${GH}/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ client_id: CID, client_secret: SECRET, code }),
      });
      const d = await r.json();
      const ok = !!d.access_token;
      const content = ok ? { token: d.access_token, provider: 'github' } : { error: d.error || 'no token' };
      const msg = 'authorization:github:' + (ok ? 'success' : 'error') + ':' + JSON.stringify(content);
      const html = `<!doctype html><meta charset="utf-8"><script>
        (function(){function r(e){window.opener.postMessage(${JSON.stringify(msg)}, e.origin);window.removeEventListener('message',r);}
        window.addEventListener('message',r,false);window.opener.postMessage('authorizing:github','*');})();
        </script>Đang đăng nhập…`;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Decap OAuth proxy OK — dùng /auth và /callback');
  } catch (e) {
    res.writeHead(500); res.end('err: ' + (e && e.message || e));
  }
});
server.listen(PORT, () => console.log('Decap OAuth proxy on :' + PORT));
