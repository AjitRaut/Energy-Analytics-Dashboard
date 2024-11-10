const AccessLog = require('../models/accessLog');

exports.createLog = async (req, res) => {
    try {
        const log = new AccessLog(req.body);
        await log.save();
        res.status(201).json({ message: 'Log created', log });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
