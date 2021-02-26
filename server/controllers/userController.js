// const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");

const userSchema = require('../models/userModel');

const app = require("../server");

// user schema
const userDataCollection = mongoose.model('user', userSchema, 'users');


// Get all users
exports.getUsers = async (req, res, next) => {
    let users = await userDataCollection.find({});
    res.send(users);
}


// To register user
exports.addUser = (req, res, next) => {

    let userObj;
    if (req.body.role == 'de') {
        userObj = new userDataCollection({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            mobileNumber: req.body.mobileNumber,
            role: req.body.role,
            deliveryExecutive: {
                vehicleNumber: req.body.vehicleNumber,
                deliveryExecutiveLocation: {
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    zip: req.body.zip,
                    state: req.body.state,
                    country: req.body.country,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                },
                activityStatus: req.body.activityStatus
            }
        });
    }
    else {
        userObj = new userDataCollection({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            mobileNumber: req.body.mobileNumber,
            role: req.body.role
        });
    }

    userObj.save(function (err, user) {
        if (err) console.log(err.message);
        else {
            console.log("User Data======>", user);
        }
    })

}


// update profile data of user
exports.updateUser = async (req, res, next) => {
    let id = req.query.id;
    let updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber
    }
    await userDataCollection.findByIdAndUpdate(id, updateData);
}


// user authentication login 
exports.loginUser = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await userDataCollection.find({ 'email': email }, { 'email': 1, 'password': 1 })

    if (user != null) {
        if (password === user.password) {
            console.log("User Logged in Successfully");
        }
        else {
            console.log("Wrong Password");
        }
    }
    else {
        console.log("User doesn't Exist");
    }
}


// Add to cart
exports.addToCart = async (req, res, next) => {
    let id = req.query.userId;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;
    const foodItem = {
        foodId:foodId,
        quantity : 1
    };
    console.log(">>>>>>" + req.query.role);

    let result;
    if (req.query.role == "user") {

        let existingCart = await userDataCollection.findById(id, { cart: 1 });
        if (existingCart.cart == undefined) {

            // foodItem.quantity = 1;
            let cart = {
                // userId:req.body.userId,
                restaurantId: restaurantId,
                foodList: [foodItem]
            }
            result = await userDataCollection.findByIdAndUpdate(id, { "cart": cart });
        } else {
            if (existingCart.cart.restaurantId.toString() === restaurantId) {
                let foodIndex = existingCart.cart.foodList.findIndex((food) => {
                    return food.foodId.toString() == foodId;
                });

                if (foodIndex != -1) {
                    // if (foodItem.quantity) {

                    // }
                    existingCart.cart.foodList[foodIndex].quantity += 1;
                }
                else {
                    existingCart.cart.foodList.push(foodItem);
                }
                result = await userDataCollection.findByIdAndUpdate(id, { "cart": existingCart.cart });

            } else {

            }

        }
    }
    res.send(result);
}

exports.reduceCartItem = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.userId);
    const foodItem = req.body;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;

    let result;

    if (req.query.role == "user") {
        let existingCart = await userDataCollection.findById(id, { cart: 1 });

        if (existingCart.cart.foodList.length == 1 && existingCart.cart.foodList[0].quantity == 1) {
            result = await userDataCollection.updateOne({ _id: id }, { $unset: { cart: 1 } });
        }
        else {
            let foodIndex = existingCart.cart.foodList.findIndex((food) => {
                return food.foodId.toString() == foodId;
            });
            if (existingCart.cart.foodList[foodIndex].quantity == 1) {
                existingCart.cart.foodList = existingCart.cart.foodList.filter((x) => { return x.foodId.toString() != foodId });
            }
            else {
                existingCart.cart.foodList[foodIndex].quantity -= 1;
            }
            result = await userDataCollection.findByIdAndUpdate(id, { "cart": existingCart.cart });
        }

    }
    res.send(result)
}


exports.removeItem =async (req, res, next) => {

    let id = mongoose.Types.ObjectId(req.query.userId);
    const foodItem = req.body;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;

    if (req.query.role == "user") {
        let existingCart = await userDataCollection.findById(id, { cart: 1 });

        let foodIndex = existingCart.cart.foodList.findIndex((food) => {
            return food.foodId.toString() == foodId;
        });

        existingCart.cart.foodList = existingCart.cart.foodList.filter((x) => { return x.foodId.toString() != foodId });
        result = await userDataCollection.findByIdAndUpdate(id, { "cart": existingCart.cart });
    }
    res.send(result);
}



exports.clearCart = async (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.userId);
    console.log(id);
    let result = await userDataCollection.updateOne({ _id: id }, { $unset: { cart: 1 } });
    res.send(result);
}


//Get user using id
exports.getUserById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.query.id);
    userDataCollection.findById(id, function (err, user) {
        if (err) console.log(err.message);
        res.status(200).json({
            user: user
        })
    })
}
