const express = require("express");
const categoryController = require('../controllers/categoryController')
const router = express.Router();


router.get('/getCategories',categoryController.getCategories);

module.exports = router;