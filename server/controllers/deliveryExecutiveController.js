// const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");

const orderSchema = require('../models/orderModel');

const app = require("../server");

const orderDataCollection = mongoose.model('order', orderSchema, 'orders');


exports.getOrders = (req, res, next) => {
  orderDataCollection.find({orderStatus:"ordered"}).populate('restaurantDetails'
  ,['restaurantName','restaurantLocation'])
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    // console.log(order)
    res.status(200).json({
        orders: order
    });
  })
}

// exports.acceptOrders = (req,res,next) => {
//   let id = mongoose.Types.ObjectId(req.params.id);
//   console.log(data)
//   orderDataCollection.findOneAndUpdate({_id:id},[{orderStatus:"Accepted"},{
//   }],)
// }
