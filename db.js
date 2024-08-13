const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'wanted'
});

if (process.env.NODE_ENV !== 'test') {
  connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류:', err);
      return;
    }
    console.log('MySQL에 성공적으로 연결되었습니다.');
  });
}

module.exports = connection;