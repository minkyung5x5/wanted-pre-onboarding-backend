const TESTPORT = 3001;
const request = require('supertest');
const startServer = require('../index');
const sequelize = require('../db');
const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');

async function initializeDatabase() {
  await sequelize.sync({ force: true });
  await Promise.all([
    Company.create({ id: 1, name: '원티드랩', country: '한국', location: '서울' }),
    Company.create({ id: 2, name: '네이버', country: '한국', location: '판교' }),
  ]);
}

describe('Job Postings API', () => {
  let server;

  beforeAll(async () => {
    server = await startServer(TESTPORT);
    await initializeDatabase(); 
  });

  afterAll(async () => {
    if (server && server.close) {
      await server.close();
    }
    await sequelize.close();
  });

  // 1. 채용공고를 등록합니다.
  test('POST /job-postings should create a new job posting', async () => {
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

// 2. 채용공고를 수정합니다.
  test('PATCH /job-postings/:id should update an existing job posting with new reward, description', async () => {
    await JobPosting.create({
      company_id: 1,
      position: '백엔드 주니어 개발자',
      reward: 1000000,
      description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
      tech_stack: 'Python',
    });

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
  });

  test('PATCH /job-postings/:id should update an existing job posting with new tech stack', async () => {
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
  });

  // 3. 채용공고를 삭제합니다.
  test('DELETE /job-postings/:id should delete an existing job posting', async () => {
    const response = await request(server)
      .delete('/job-postings/1')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('채용공고가 성공적으로 삭제되었습니다.');
  });

  test('DELETE /job-postings/:id should return 404 if job posting does not exist', async () => {
    const response = await request(server)
      .delete('/job-postings/' + null)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('해당 채용공고를 찾을 수 없습니다.');
  });
  
  // 4. 채용공고 목록을 가져옵니다.
  // 4-1. 사용자는 채용공고 목록을 확인할 수 있습니다.
  test('GET /job-postings should return a list of job postings', async () => {
    await initializeDatabase();
    await JobPosting.create({
      company_id: 1,
      position: '백엔드 주니어 개발자',
      reward: 1000000,
      description: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
      tech_stack: 'Python',
    });
    await JobPosting.create({
      company_id: 2,
      position: '프론트엔드 시니어 개발자',
      reward: 2000000,
      description: "네이버에서 프론트엔드 시니어 개발자를 채용합니다. 자격요건은..",
      tech_stack: 'Javascript',
    });

    const response = await request(server).get('/job-postings');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          company_name: '원티드랩',
          company_country: '한국',
          company_location: '서울',
          position: '백엔드 주니어 개발자',
          reward: 1000000,
          tech_stack: 'Python',
        },
        {
          id: 2,
          company_name: '네이버',
          company_country: '한국',
          company_location: '판교',
          position: '프론트엔드 시니어 개발자',
          reward: 2000000,
          tech_stack: 'Javascript',
        },
      ])
    );
  });

  // 5. 채용 상세 페이지를 가져옵니다.
  test('GET /job-postings/:id should return job posting details', async () => {
    await initializeDatabase();
    await JobPosting.bulkCreate([
      { id: 1, company_id: 1, position: '백엔드 주니어 개발자', reward: 1000000, tech_stack: 'Python', description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다.' },
      { id: 2, company_id: 1, position: '프론트엔드 주니어 개발자', reward: 1200000, tech_stack: 'JavaScript', description: '원티드랩에서 프론트엔드 주니어 개발자를 채용합니다.' },
      { id: 3, company_id: 2, position: '백엔드 시니어 개발자', reward: 2000000, tech_stack: 'Java', description: '네이버에서 백엔드 시니어 개발자를 채용합니다.' }
    ]);

    const response = await request(server).get('/job-postings/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      company_name: '원티드랩',
      company_country: '한국',
      company_location: '서울',
      position: '백엔드 주니어 개발자',
      reward: 1000000,
      tech_stack: 'Python',
      description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다.',
      company_jobPostings: [2],
    });
  });


});
