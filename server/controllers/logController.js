const AccessLog = require('../models/AccessLog');

exports.createLog = async (req, res) => {
    const { access_time, access_date, employee_name, algo_status } = req.body;

    try {
        const log = new AccessLog({
            user: req.user._id,  
            access_time,
            access_date,
            employee_name,
            algo_status,
        });
        await log.save();
        res.status(201).json({ message: 'Log created', log });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await AccessLog.find().sort({ access_time: 1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
