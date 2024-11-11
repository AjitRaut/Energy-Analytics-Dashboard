const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const { protect } = require('../middleWare/authMiddelware');

const router = express.Router();

router.post('/log', createLog);
router.get('/logs', protect, getLogs);

module.exports = router;
