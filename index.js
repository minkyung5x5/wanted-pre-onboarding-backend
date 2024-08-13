const PORT = 3000;
const http = require('http');
const jobPostingsRouter = require('./routes/jobPostings');

function startServer(port = PORT) { 
  const server = http.createServer((req, res) => {
    if (req.url.startsWith('/job-postings')) {
      jobPostingsRouter(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });

  server.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;