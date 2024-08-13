const express = require('express');
const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');

const router = express.Router();

// 1. 채용공고를 등록합니다.
router.post('/', async (req, res) => {
  try {
    const { company_id, position, reward, description, tech_stack } = req.body;

    const newJobPosting = await JobPosting.create({
      company_id,
      position,
      reward,
      description,
      tech_stack
    });

    res.status(201).json({ message: '채용공고가 성공적으로 등록되었습니다.', id: newJobPosting.id });
  } catch (err) {
    console.error('데이터 삽입 오류:', err);
    res.status(500).json({ error: '데이터 삽입 중 오류가 발생했습니다.' });
  }
});

// 2. 채용공고를 수정합니다.
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { position, reward, description, tech_stack } = req.body;

    const jobPosting = await JobPosting.findByPk(id);

    if (!jobPosting) {
      return res.status(404).json({ error: '해당 채용공고를 찾을 수 없습니다.' });
    }

    await jobPosting.update({
      position,
      reward,
      description,
      tech_stack,
    });

    res.status(200).json({ message: '채용공고가 성공적으로 수정되었습니다.' });
  } catch (err) {
    console.error('데이터 수정 오류:', err);
    res.status(500).json({ error: '데이터 수정 중 오류가 발생했습니다.' });
  }
});

// 3. 채용공고를 삭제합니다.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const jobPosting = await JobPosting.findByPk(id);

    if (!jobPosting) {
      return res.status(404).json({ error: '해당 채용공고를 찾을 수 없습니다.' });
    }

    await jobPosting.destroy();

    res.status(200).json({ message: '채용공고가 성공적으로 삭제되었습니다.' });
  } catch (err) {
    console.error('데이터 삭제 오류:', err);
    res.status(500).json({ error: '데이터 삭제 중 오류가 발생했습니다.' });
  }
});

// 4. 채용공고 목록을 가져옵니다.
// 4-1. 사용자는 채용공고 목록을 확인할 수 있습니다.
router.get('/', async (req, res) => {
  try {
    const jobPostings = await JobPosting.findAll({
      attributes: ['id', 'position', 'reward', 'tech_stack'],
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['name', 'country', 'location'],
        },
      ],
    });

    const result = jobPostings.map(job => ({
      id: job.id,
      company_name: job.company.name,
      company_country: job.company.country,  
      company_location: job.company.location,
      position: job.position,
      reward: job.reward,
      tech_stack: job.tech_stack,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error('채용공고 목록 가져오기 오류:', err);
    res.status(500).json({ error: '채용공고 목록을 가져오는 중 오류가 발생했습니다.' });
  }
});

// 5. 채용 상세 페이지를 가져옵니다.
router.get('/:id', async (req, res) => {
  try {
    const jobPosting = await JobPosting.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Company,
          as: 'company',
        }
      ],
    });

    if (!jobPosting) {
      return res.status(404).json({ error: '해당 채용공고를 찾을 수 없습니다.' });
    } 

    const companyJobPostings = await JobPosting.findAll({ where: { company_id: jobPosting.company_id } });

    const response = {
      id: jobPosting.id,
      company_name: jobPosting.company.name,
      company_country: jobPosting.company.country,  
      company_location: jobPosting.company.location,
      position: jobPosting.position,
      reward: jobPosting.reward,
      tech_stack: jobPosting.tech_stack,
      description: jobPosting.description,
      company_jobPostings: companyJobPostings
        .filter(otherJob => otherJob.id !== jobPosting.id)
        .map(otherJob => otherJob.id),
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('채용공고 가져오기 오류:', err);
    res.status(500).json({ error: '채용공고를 가져오는 중 오류가 발생했습니다.' });
  }
});

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
