const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    access_time: {
        type: String,
        required: true,
    },
    access_date: {
        type: String,
        required: true,
    },
    employee_name: {
        type: String,
        required: true,
    },
    algo_status: {
        type: String, 
        enum: ['ON', 'OFF'], 
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
