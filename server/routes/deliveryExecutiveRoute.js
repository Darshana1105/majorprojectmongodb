const express = require("express");
// const { body } = require("express-validator");
const auth = require("../helpers/authAPI");


const deliveryExecutiveController = require("../controllers/deliveryExecutiveController");
// const auth = require("../middleware/auth");

const router = express.Router();

router.get('/orders', deliveryExecutiveController.getOrders);

router.patch('/accept-order-de/:oid',auth.authAPI, deliveryExecutiveController.acceptOrderDe);

router.patch('/order-status/:oid',auth.authAPI, deliveryExecutiveController.orderStatus);

router.get('/active-orders',auth.authAPI, deliveryExecutiveController.activeOrders);

router.get('/recent-orders',auth.authAPI, deliveryExecutiveController.getRecentOrders);

router.get('/delivered-orders',auth.authAPI, deliveryExecutiveController.deliveredOrders);

router.get('/getRatings',auth.authAPI, deliveryExecutiveController.getRatings);

router.post('/send-mail/:mail/:status', deliveryExecutiveController.sendMail);

router.put('/update-de',auth.authAPI, deliveryExecutiveController.updateDe);

router.get('/getOtp/:oid', deliveryExecutiveController.getOtp);

module.exports = router;
