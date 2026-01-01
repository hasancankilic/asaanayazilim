/**
 * Production Server Entry Point
 * cPanel Node.js hosting için gerekli
 * 
 * Kullanım:
 * 1. Bu dosyayı proje root'una kopyalayın
 * 2. package.json'da "start" script'ini kontrol edin
 * 3. cPanel'de Node.js app oluştururken bu dosyayı entry point olarak belirtin
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ 
  dev,
  hostname,
  port,
  // Custom server için
  customServer: true,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Next.js'in kendi handler'ını kullan
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });
});

