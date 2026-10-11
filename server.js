const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const HTTP_PORTS = [8787, 8087, 87];
const HTTPS_PORTS = [8443, 8788];
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function requestHandler(req, res) {
  let requestedPath = req.url.split('?')[0];
  if (requestedPath === '/' || requestedPath === '') {
    requestedPath = '/index.html';
  }

  const safePath = path.normalize(requestedPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + requestedPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
}

// 1. Start HTTP Servers
HTTP_PORTS.forEach((port) => {
  const server = http.createServer(requestHandler);
  server.listen(port, () => {
    console.log(`[HTTP READY] http://localhost:${port}`);
  });
  server.on('error', (err) => {
    // Port might be in use or restricted, continue quietly
  });
});

// 2. Start Secure HTTPS Servers
try {
  const keyPath = path.join(BASE_DIR, 'key.pem');
  const certPath = path.join(BASE_DIR, 'cert.pem');

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };

    HTTPS_PORTS.forEach((port) => {
      const httpsServer = https.createServer(httpsOptions, requestHandler);
      httpsServer.listen(port, () => {
        console.log(`[HTTPS SECURE READY] https://localhost:${port}`);
      });
      httpsServer.on('error', (err) => {
        // Port might be in use
      });
    });
  }
} catch (e) {
  console.warn('[HTTPS WARNING] Could not start HTTPS:', e.message);
}
