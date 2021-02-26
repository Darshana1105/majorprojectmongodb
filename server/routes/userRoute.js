const express = require("express");
// const { body } = require("express-validator");

const userController = require("../controllers/userController");
const auth = require("../helpers/authAPI");

const router = express.Router();

router.get('/users', userController.getUsers);

router.post('/addUser',userController.addUser);

router.put('/resetPassword',userController.resetPassword);

router.put('/updateUser',auth.authAPI,userController.updateUser);

router.post('/login', userController.loginUser);

router.put('/addToCart',auth.authAPI,userController.addToCart);

router.put('/reduceCartItem',auth.authAPI,userController.reduceCartItem);

router.put('/clearCart',auth.authAPI,userController.clearCart);

router.get('/getUserById',auth.authAPI,userController.getUserById);

router.post('/sendOtpForResetPassword',userController.sendOtpForResetPassword);

module.exports = router; 
