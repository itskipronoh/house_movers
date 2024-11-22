require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/VehicleRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const { notFound, errorHandlerMiddleware } = require('./middleware');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', userRoutes);

app.use('/vehicles', vehicleRoutes);
app.use('/', orderRoutes);
app.get('/', (req, res) => {
  res.send('HouseMovers API is running');
});

// middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(process.env.MONGODB_URI); // connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
