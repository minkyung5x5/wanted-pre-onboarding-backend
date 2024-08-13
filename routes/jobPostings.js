const express = require('express');
const JobPosting = require('../models/JobPosting');

const router = express.Router();

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

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
