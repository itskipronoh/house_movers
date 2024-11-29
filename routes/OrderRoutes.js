const express = require('express');
const {
  viewOrders,
  updateOrder,
  updateOrderStatus,
  placeOrder,
  getAllOrders
} = require('../controllers/OrderController');

const verifyToken = require('../middleware/authMiddleware');



const router = express.Router();

router.get('/orders', getAllOrders);

router.post('/placeOrder',verifyToken,  placeOrder);
router.get('/viewOrder/:id', viewOrders);
router.post('/updateOrder', updateOrder);
router.post('/updateOrderStatus', updateOrderStatus);

module.exports = router;
