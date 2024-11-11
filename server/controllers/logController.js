const AccessLog = require('../models/AccessLog');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createLog = async (req, res) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }


        const { access_time, access_date, employee_name, algo_status } = req.body;

        if (!access_time || !access_date || !employee_name || !algo_status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const log = new AccessLog({
            user: user._id,  
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
