const ChartsData = require("../models/chartData");

exports.getChartData = async (req, res) => {
  try {
    const data = await ChartsData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getChartDataByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const data = await ChartsData.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
