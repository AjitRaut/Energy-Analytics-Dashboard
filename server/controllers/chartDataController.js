const ChartsData = require('../models/chartData');

exports.getChartData = async (req, res) => {
    try {
        const data = await ChartsData.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
