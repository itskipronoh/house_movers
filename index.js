require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const teamRoutes = require('./routes/TeamRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');
const itemRoutes = require('./routes/ItemRoutes');
const vehicleRoutes = require('./routes/VehicleRoutes');
const orderRoutes = require('./routes/OrderRoutes');

const app = express();
app.use(cors());
app.use(express.json());


connectDB();

app.use('/auth', userRoutes);
app.use('/customers', customerRoutes);
app.use('/teams', teamRoutes);
app.use('/employees', employeeRoutes);
app.use('/items', itemRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/orders', orderRoutes);


app.get('/', (req, res) => {
    res.send('HouseMovers API is running');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
} catch (error) {
        console.log(error);
    
}

   
}

startServer();

