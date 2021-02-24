// const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");

const orderSchema = require('../models/orderModel');

const userSchema = require('../models/userModel');

const app = require("../server");

const nodemailer = require("nodemailer");

const userDataCollection = mongoose.model('user', userSchema, 'users');

const orderDataCollection = mongoose.model('order', orderSchema, 'orders');


exports.getOrders = (req, res, next) => {
  orderDataCollection.find({orderStatus:"ordered"}).populate('restaurantDetails'
  ,['restaurantName','restaurantLocation']).populate('userId',['firstName','email'])
  .exec(function (err,order) {
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
  let id = mongoose.Types.ObjectId(req.params.id);
  orderDataCollection.find({orderStatus:"delivered",deliveryExecutive:id})
  .populate('restaurantDetails'
  ,['restaurantName','restaurantLocation']).populate('userId',['firstName'])
  .limit(2)
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    //console.log(order)
    res.status(200).json({
        orders: order
    });
  })
}

exports.acceptOrder = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  //console.log(req.body.dId)
  let updateData = {
    orderStatus: "accepted",
    deliveryExecutive: req.body.dId
  }
  orderDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
    if (err) console.log(err.message);
    else {
        console.log("Data updated ", res);
    }
  });
}

exports.orderStatus = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  console.log(req.body)
  let updateData = {
    orderStatus: req.body.status,
    orderDateAndTime: req.body.orderDateAndTime
  }
  orderDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
    if (err) console.log(err.message);
    else {
        console.log("Data updated ", res);
    }
  });
}

exports.activeOrders = (req,res,next) =>{
  let id = mongoose.Types.ObjectId(req.params.id);
  orderDataCollection.find({$and: [{$or:[{orderStatus:"accepted"},{orderStatus:"Picked-up"},
  {orderStatus:"On-the-Way"}]},{deliveryExecutive:id}]})
  .populate('restaurantDetails'
  ,['restaurantName','restaurantLocation']).populate('userId',['firstName','email'])
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    //console.log(order)
    res.status(200).json({
        orders: order
    });
  })
}

exports.deliveredOrders = (req,res,next) =>{
  let id = mongoose.Types.ObjectId(req.params.id);
  orderDataCollection.find({$and:[{orderStatus:"delivered"},{deliveryExecutive:id}]})
  .select('_id restaurantDetails orderDateAndTime orderLocation totalAmount')
  .populate('restaurantDetails',['restaurantName'])
  .exec(function (err,order) {
    if (err) {
        console.error(err);
    }
    //console.log(order)
    res.status(200).json({
        orders: order
    });
  })
}

exports.getRatings = (req,res,next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    userDataCollection.findById(id).select('deliveryExecutive').exec(function (err, rating) {
      if (err) console.log(err.message);
    res.status(200).json({
      ratings: rating
    })
  })
}

exports.updateDe = (req,res,next) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  //console.log(req.body)
  let updateData = req.body;

  userDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
    if (err) console.log(err.message);
    else {
        console.log("Data updated ", res);
    }
  });
}

exports.sendMail = (req,res,next) =>{
  console.log(req.body)
  main(req.params.mail,req.params.status,req.body);
  res.status(200).json({
    status:"sent"
  })
}




async function main(id,status,body) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "CEL@evolvingsols.com",
      pass: "Gmail#@5689",
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bite Food App 👻" CEL@evolvingsols.com', // sender address
    to: id, // list of receivers
    subject: "Bite : Your Order Status ✔", // Subject line
    html: "<p>Thanks For Choosing Bite</p><p>Your Order status is - "+status+"</p>"+
    "<p> Restaurant Name - "+body.restaurantName+"</p>"+
    "<p> Billing Amount - "+body.billAmount+"</p>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
