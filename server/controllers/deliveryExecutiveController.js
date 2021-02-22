// const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");

const orderSchema = require('../models/orderModel');

const userSchema = require('../models/userModel');

// const app = require("../server");

const userDataCollection = mongoose.model('user', userSchema, 'users');

const orderDataCollection = mongoose.model('order', orderSchema, 'orders');


exports.getOrders = (req, res, next) => {
  console.log("Hello /../////");
  
  orderDataCollection.find({ orderStatus: "ordered" }).populate('restaurantDetails'
    , ['restaurantName', 'restaurantLocation']).populate('userId', ['firstName', 'email'])
    .exec(function (err, order) {
      if (err) {
        console.error(err);
      }
      //console.log(order)
      res.status(200).json({
        orders: order
      });
    })
}

exports.getRecentOrders = (req, res, next) => {
  orderDataCollection.find({ orderStatus: "delivered" }).populate('restaurantDetails'
    , ['restaurantName', 'restaurantLocation']).populate('userId', ['firstName'])
    .limit(2)
    .exec(function (err, order) {
      if (err) {
        console.error(err);
      }
      //console.log(order)
      res.status(200).json({
        orders: order
      });
    })
}

exports.acceptOrders = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  //console.log(req.body.dId)
  let updateData = {
    orderStatus: "accepted",
    deliveryExecutive: req.body.dId
  }
  orderDataCollection.findByIdAndUpdate(id, updateData, function (err, res) {
    if (err) console.log(err.message);
    else {
      console.log("Data updated ", res);
    }
  });
}

exports.doneOrders = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  //console.log(req.body.dId)
  let updateData = {
    orderStatus: "delivered",
    orderDateAndTime: req.body.orderDateAndTime
  }
  orderDataCollection.findByIdAndUpdate(id, updateData, function (err, res) {
    if (err) console.log(err.message);
    else {
      console.log("Data updated ", res);
    }
  });
}

exports.activeOrders = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  orderDataCollection.find({ orderStatus: "accepted", deliveryExecutive: id })
    .populate('restaurantDetails'
      , ['restaurantName', 'restaurantLocation']).populate('userId', ['firstName', 'email'])
    .exec(function (err, order) {
      if (err) {
        console.error(err);
      }
      console.log(order)
      res.status(200).json({
        orders: order
      });
    })
}

exports.deliveredOrders = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  orderDataCollection.find({ orderStatus: "delivered", deliveryExecutive: id })
    .select('_id restaurantDetails orderDateAndTime orderLocation totalAmount')
    .populate('restaurantDetails', ['restaurantName'])
    .exec(function (err, order) {
      if (err) {
        console.error(err);
      }
      console.log(order)
      res.status(200).json({
        orders: order
      });
    })
}

exports.getRatings = (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  userDataCollection.findById(id).select('deliveryExecutive').exec(function (err, rating) {
    if (err) console.log(err.message);
    res.status(200).json({
      ratings: rating
    })
  })
}
