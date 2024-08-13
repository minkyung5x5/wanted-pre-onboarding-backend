const JobPosting = require('../models/JobPosting');

function parseRequestBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(body));
  });
}

async function createJobPosting(req, res) {
  parseRequestBody(req, async (data) => {
    try {
      const { company_id, position, reward, description, tech_stack } = data;

      const newJobPosting = await JobPosting.create({
        company_id,
        position,
        reward,
        description,
        tech_stack
      });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '채용공고가 성공적으로 등록되었습니다.', id: newJobPosting.id }));
    } catch (err) {
      console.error('데이터 삽입 오류:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '데이터 삽입 중 오류가 발생했습니다.' }));
    }
  });
}

function jobPostingsRouter(req, res) {
  if (req.method === 'POST' && req.url === '/job-postings') {
    createJobPosting(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = jobPostingsRouter;
