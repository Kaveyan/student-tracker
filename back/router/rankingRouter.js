const express = require('express');
const router = express.Router();
const { updateStudentRanking, getStudentRankings } = require('../controller/rankingController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes - only authenticated users can access
router.post('/update', authMiddleware, updateStudentRanking);
router.get('/:studentId', authMiddleware, getStudentRankings);

module.exports = router;
