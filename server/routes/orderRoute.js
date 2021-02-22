const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post('/addOrder',orderController.addOrder);

router.get('/userOrders',orderController.getOrders);

module.exports = router;