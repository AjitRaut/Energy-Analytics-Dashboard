const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    access_time: String,
    access_date: Date,
    employee_name: String,
    algo_status: String,
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
