const express = require("express");
// const { body } = require("express-validator");

const deliveryExecutiveController = require("../controllers/deliveryExecutiveController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get('/orders', deliveryExecutiveController.getOrders);

module.exports = router;
