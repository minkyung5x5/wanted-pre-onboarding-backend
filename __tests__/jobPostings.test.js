const TESTPORT = 3001;
const request = require('supertest');
const startServer = require('../index');
const db = require('../db');

jest.mock('../db');

describe('Job Postings API', () => {
  let server;

  beforeAll(() => {
    server = startServer(TESTPORT);
  });

  afterAll(() => {
    server.close();
    db.end();
  });

  test('POST /job-postings should create a new job posting', async () => {
    const mockResult = { insertId: 1 };
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockResult);
    });

    const response = await request(server)
      .post('/job-postings')
      .send({
        company_id: 1,
        position: '백엔드 주니어 개발자',
        reward: 1000000,
        description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
        tech_stack: 'Python'
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('채용공고가 성공적으로 등록되었습니다.');
    expect(response.body.id).toBe(1);
  });
});
