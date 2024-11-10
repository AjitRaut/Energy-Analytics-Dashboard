const express = require("express");
const connectDB = require("./config/db");
const chartRoutes = require('./routes/chartRoute');
// const logRoutes = require('./routes/logRoutes');
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/chart', chartRoutes);
// app.use('/api/log', logRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
