const http = require('http');
const jobPostingsRouter = require('./routes/jobPostings');

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/job-postings')) {
    jobPostingsRouter(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
