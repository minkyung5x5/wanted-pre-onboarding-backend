const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wanted', 'root', '1234', {
  host: '127.0.0.1',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  logging: false,
});

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => {
      console.log('MySQL에 성공적으로 연결되었습니다.');
    })
    .catch(err => {
      console.error('MySQL 연결 오류:', err);
    });
}

module.exports = sequelize;