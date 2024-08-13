const express = require('express');
const sequelize = require('./db');
const jobPostingsRouter = require('./routes/jobPostings');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/job-postings', jobPostingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

async function startServer(port = PORT) {
  try {
    await sequelize.authenticate();
    console.log('MySQL 연결이 성공적으로 설정되었습니다.');
    await sequelize.sync();

    const server = app.listen(port, () => {
      console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
    });

    return server;

  } catch (error) {
    console.error('서버 시작 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;
