const express = require('express');
const {
  viewOrders,
  updateOrder,
  updateOrderStatus,
  placeOrder,
} = require('../controllers/OrderController');

const verifyToken = require('../middleware/authMiddleware');



const router = express.Router();

router.post('/placeOrder',verifyToken,  placeOrder);
router.post('/vieworders', viewOrders);
router.post('/updateOrder', updateOrder);
router.post('/updateOrderStatus', updateOrderStatus);

module.exports = router;
