const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    total_kwh: Number,
    createdAt: Date,
    algo_status: String,
});

module.exports = mongoose.model('ChartData', chartDataSchema);
