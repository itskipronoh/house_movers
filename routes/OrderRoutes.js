const express = require('express');
const { viewOrders, updateOrder , updateOrderStatus } = require('../controllers/OrderController');
// const { updateOrderStatus } = require('../controllers/OrderController');



const router = express.Router();

router.post('/vieworders', viewOrders);
router.post('/updateOrder', updateOrder);
router.post('/updateOrderStatus', updateOrderStatus);

module.exports = router;
