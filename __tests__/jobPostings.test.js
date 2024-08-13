const TESTPORT = 3001;
const request = require('supertest');
const startServer = require('../index');
const sequelize = require('../db');
const JobPosting = require('../models/JobPosting');

jest.mock('../models/JobPosting');

describe('Job Postings API', () => {
  let server;

  beforeAll(async () => {
    server = await startServer(TESTPORT);
  });

  afterAll(async () => {
    await server.close();
    await sequelize.close();
  });

  test('POST /job-postings should create a new job posting', async () => {
    const mockJobPosting = { id: 1 };
    JobPosting.create.mockResolvedValue(mockJobPosting);

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

  test('PATCH /job-postings/:id should update an existing job posting', async () => {
    const mockJobPosting = { id: 1, update: jest.fn() };
    JobPosting.findByPk.mockResolvedValue(mockJobPosting);
  
    const response = await request(server)
      .patch('/job-postings/1')
      .send({
        position: '백엔드 주니어 개발자',
        reward: 1500000,
        description: "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
        tech_stack: 'Python'
      })
      .set('Accept', 'application/json');
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('채용공고가 성공적으로 수정되었습니다.');
    expect(mockJobPosting.update).toHaveBeenCalledWith({
      position: '백엔드 주니어 개발자',
      reward: 1500000,
      description: "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
      tech_stack: 'Python'
    });
  });

  test('PATCH /job-postings/:id should update job posting with new tech stack', async () => {
    const mockJobPosting = { id: 1, update: jest.fn() };
    JobPosting.findByPk.mockResolvedValue(mockJobPosting);

    const response = await request(server)
      .patch('/job-postings/1')
      .send({
        position: '백엔드 주니어 개발자',
        reward: 1000000,
        description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
        tech_stack: 'Django'
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('채용공고가 성공적으로 수정되었습니다.');
    expect(mockJobPosting.update).toHaveBeenCalledWith({
      position: '백엔드 주니어 개발자',
      reward: 1000000,
      description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      tech_stack: 'Django'
    });
  });
  
});
