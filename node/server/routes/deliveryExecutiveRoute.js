const express = require("express");
// const { body } = require("express-validator");

const deliveryExecutiveController = require("../controllers/deliveryExecutiveController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get('/orders', deliveryExecutiveController.getOrders);

router.patch('/acceptOrder/:oId',data,deliveryExecutiveController.acceptOrders)

module.exports = router;
