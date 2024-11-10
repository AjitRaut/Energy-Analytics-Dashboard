const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chartRoutes = require('./routes/chartRoutes');
const logRoutes = require('./routes/logRoutes');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chart', chartRoutes);
app.use('/api/log', logRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
