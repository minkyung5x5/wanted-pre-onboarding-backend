const PORT = 3000;
const http = require('http');
const sequelize = require('./db');
const jobPostingsRouter = require('./routes/jobPostings');

async function startServer(port = PORT) { 
  try {
    await sequelize.authenticate();
    console.log('MySQL 연결이 성공적으로 설정되었습니다.');
    await sequelize.sync();

    const server = http.createServer((req, res) => {
      if (req.url.startsWith('/job-postings')) {
        jobPostingsRouter(req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
    });

    return server.listen(port, () => {
      console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
    });

  } catch (error) {
    console.error('서버 시작 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;
