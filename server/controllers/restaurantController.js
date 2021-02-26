var mongoose = require("mongoose");
const restaurantSchema = require('../models/restaurantModel');
// const foodSchema = require('../models/foodModel');
const app = require("../server");
// const categorySchema = require("../models/categoryModel");
const orderSchema = require('../models/orderModel');
const orderDataCollection = mongoose.model('order', orderSchema, 'orders');

restaurantSchema.index({ '$**': 'text' });
const restaurantDataCollection = mongoose.model('restaurant', restaurantSchema, 'restaurants');

exports.getRestaurants = (req, res, next) => {
    restaurantDataCollection.aggregate([
        {
            "$addFields": {
                "rating_avg": {
                    "$avg": {
                        "$map": {
                            "input": "$restaurantRatings",
                            "as": "restRating",
                            "in": "$$restRating.rating"
                        }
                    }
                }
            }
        }
    ]).exec(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
}


exports.getRestaurantById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.id);

    restaurantDataCollection.aggregate([{ "$match": { "_id": id } },
    {
        "$addFields": {
            "rating_avg": {
                "$avg": {
                    "$map": {
                        "input": "$restaurantRatings",
                        "as": "restRating",
                        "in": "$$restRating.rating"
                    }
                }
            }
        }
    }
    ])
        .exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
}

exports.addRestaurant = (req, res, next) => {
    let restaurantObj = new restaurantDataCollection(
        req.body
    )
    restaurantObj.save(function (err, val) {
        if (err) console.log(err.message);
        else {
            console.log("Rest Data======>", val);
        }
    })
}

exports.addRestaurantRating = async (req, res, next) => {
    let restaurantId = req.body.restaurantId;

    let restaurantRatings = {
        userId: req.body.userId,
        rating: req.body.restaurantRating
    }

    let restaurantData = await restaurantDataCollection.findById(restaurantId);
    let restaurantRating = restaurantData.restaurantRatings.find((x) => x.userId == req.body.userId);

    // console.log(restaurantRating);

    if (restaurantRating == undefined) {
        await restaurantDataCollection.findByIdAndUpdate(restaurantId, { $push: { restaurantRatings: restaurantRatings } });
    } else {
        await restaurantDataCollection.updateOne({"_id":restaurantId, "restaurantRatings.userId":req.body.userId}, { $set: { 'restaurantRatings.$.rating': req.body.restaurantRating } });
    }


}

exports.getTopRestaurants = (req, res, next) => {
    restaurantDataCollection.aggregate([
        {
            "$addFields": {
                "rating_avg": {
                    "$avg": {
                        "$map": {
                            "input": "$restaurantRatings",
                            "as": "restRating",
                            "in": "$$restRating.rating"
                        }
                    }
                }
            }
        },
        { "$sort": { "rating_avg": -1 } }
    ])
        .limit(6)
        .exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
}


exports.searchRestaurants = async (req, res, next) => {
    let search = req.body.search;
    let city = req.body.city;
    let searchRestaurants = await restaurantDataCollection.find({
        $and: [{ 'restaurantLocation.city': city },
        {
            $text: {
                $search: search
            }
        }
        ]
    });
    // .catch((err) => {
    //     res.send(err)
    // });
    // let searchRestaurants= await restaurantDataCollection.aggregate([{"search city":{$in:[city,'$restaurantLocation.city']}}]).exec(function(err,data){

    console.log(searchRestaurants);

    res.send(searchRestaurants);
}

exports.getFoodByRestaurant = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.id);

    let foodList = [];

    let restaurant = await restaurantDataCollection.findById(id);
    let avgRating = 0;

    restaurant.menuDetails.forEach((food) => {
        avgRating = food.foodRating.reduce((total, current) => total + current.rating, 0) / food.foodRating.length;
        foodList.push({ restaurantId: id, food: food, avgRating: avgRating });
    })

    foodList = foodList.sort(function (a, b) {
        return (a.avgRating < b.avgRating) ? 1 : -1;
    });

    res.send(foodList);

}

exports.getTopFood = async (req, res, next) => {
    let city = "Ahmedabad";
    let rest = await restaurantDataCollection.find({ 'restaurantLocation.city': city }).select('menuDetails');
    let foodlist = [];
    let ratings = [];
    var temp;
    rest.forEach((element, index) => {

        element.menuDetails.forEach((food) => {
            let avgRating = 0;
            if (food.foodRating != undefined && food.foodRating.length > 0)
                avgRating = food.foodRating.reduce((total, current) => total + current.rating, 0) / food.foodRating.length;
            foodlist.push({ restaurantId: element._id.toString(), food: food, avgRating: avgRating })
        })
    })

    foodlist = foodlist.sort(function (a, b) {
        return (a.avgRating < b.avgRating) ? 1 : -1;
    })

    res.send(foodlist);
}
exports.acceptOrderRo = (req,res,next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    //console.log(req.body.dId)
    let updateData = {
      orderStatus: req.body.status,
    }
    orderDataCollection.findByIdAndUpdate(id,updateData,function(err, res) {
      if (err) console.log(err.message);
      else {
          console.log("Data updated ", res);
      }
    });
  }
// exports.getTopFood = (req, res, next) => {
//     restaurantDataCollection.aggregate([
//         {
//             "$addFields": {
//                 "menuDetails.foodRating_avg": {
//                         "$map": {
//                             "input": "$menuDetails",
//                             "as": "food",
//                             "in": {
//                                 "$avg": {

//                                         "$food.foodRating.$rating"

//                                 }
//                             }

//                         }

//                 }
//             }
//         },
//         { "$sort": { "menuDetails.foodRating_avg": -1 } }
//     ])
//         .limit(5)
//         .exec(function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             res.send(result);
//         });
// }