require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/CustomerRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

app.use('/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('HouseMovers API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

