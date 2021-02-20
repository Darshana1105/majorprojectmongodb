var mongoose = require("mongoose");
const orderSchema = require('../models/orderModel');
const app = require("../server");

const orderDataCollection= mongoose.model('order',orderSchema,'orders');

// exports.addOrder = (req, res, next) => {
//   let orderObj;
//       orderObj = new orderDataCollection({
//       orderLocation: {
//         streetAddress: req.body.streetAddress,
//         city: req.body.city,
//         zip: req.body.zip,
//         state: req.body.state,
//         country: req.body.country,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//       },
//       totalAmount: req.body.total,
//       orderStatus: req.body.status,
//       foodList: [{
//         foodItem: {
//           foodName:req.body.foodName
//         }
//       }

//       ],
//       gender: req.body.gender,
//       mobileNumber: req.body.mobileNumber,
//       role: req.body.role,
//       deliveryExecutive: {
//           vehicleNumber: req.body.vehicleNumber,
//           deliveryExecutiveLocation: {
//               streetAddress: req.body.streetAddress,
//               city: req.body.city,
//               zip: req.body.zip,
//               state: req.body.state,
//               country: req.body.country,
//               latitude: req.body.latitude,
//               longitude: req.body.longitude,
//           },
//           activityStatus: req.body.activityStatus
//       }
//   });
//   orderObj.save(function (err, user) {
//       if (err) console.log(err.message);
//       else {
//           console.log("User Data======>", user);
//       }
//   })

// }

