const express = require("express");
// const { body } = require("express-validator");

const deliveryExecutiveController = require("../controllers/deliveryExecutiveController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get('/orders', deliveryExecutiveController.getOrders);

router.patch('/accept-order/:id/', deliveryExecutiveController.acceptOrder);

router.patch('/order-status/:id/', deliveryExecutiveController.orderStatus);

router.get('/active-orders/:id', deliveryExecutiveController.activeOrders);

router.get('/recent-orders/:id', deliveryExecutiveController.getRecentOrders);

router.get('/delivered-orders/:id', deliveryExecutiveController.deliveredOrders);

router.get('/getRatings/:id', deliveryExecutiveController.getRatings);

router.post('/send-mail/:mail/:status', deliveryExecutiveController.sendMail);

router.put('/update-de/:id/', deliveryExecutiveController.updateDe);

module.exports = router;
