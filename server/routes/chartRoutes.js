const express = require('express');
const { getChartData, getChartDataByDateRange } = require('../controllers/chartDataController');
const { protect } = require('../middleWare/authMiddelware');


const router = express.Router();
router.get('/data', getChartData);
router.get('/data/date-range', protect, getChartDataByDateRange);

module.exports = router;
