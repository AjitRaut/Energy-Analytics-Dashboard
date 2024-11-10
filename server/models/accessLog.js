const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    access_time: String,
    access_date: Date,
    employee_name: String,
    algo_status: Number,
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
