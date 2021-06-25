const express = require("express");
const router = express.Router();

const ordersControllers = require("../controllers/ordersControllers");

router.post("/order/create", ordersControllers.createOrder);
router.get('/orders', ordersControllers.getAllOrders)
router.get('/order/:id', ordersControllers.getOrderById)

module.exports = router;




