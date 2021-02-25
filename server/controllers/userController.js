var mongoose = require("mongoose");
const userSchema = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../helpers/authAPI");


const app = require("../server");

// user schema
const userDataCollection = mongoose.model('user', userSchema, 'users');

// user authentication login 
exports.loginUser = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await userDataCollection.findOne({ 'email': email });
    console.log("userRole" + user.role);

    if (user && password === user.password) {
        const token = jwt.sign({ userId: user._id, email: user.email, password: user.password, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        req.session.token = token;
        return res.status(200).json({ token: token, firstName: user.firstName });
    }
    else if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    else {
        res.status(400).json({ message: "User or Password is not match" });
    }
}

exports.logoutUser = (req, res, next) => {
    req.session.name = null;
}


// Get all users
exports.getUsers = async (req, res, next) => {
    console.log("this is session " + req.session.name);
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
    console.log(">>>>>>>>>",req.body);
    
    let id = req.body.userId;
    let updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
    }
    // await userDataCollection.findByIdAndUpdate(id, updateData);
}

// Add to cart
exports.addToCart = async (req, res, next) => {
    let id = req.body.userId;
    const foodItem = req.body.foodItem;
    const restaurantId = req.body.restaurantId;

    if (req.body.role == "user") {

        let existingCart = await userDataCollection.findById(id, { cart: 1 });
        console.log(existingCart);
        if (existingCart.cart == undefined) {

            let cart = {
                // userId:req.body.userId,
                restaurantId: restaurantId,
                foodList: [foodItem]
            }
            let result = await userDataCollection.findByIdAndUpdate(id, { "cart": cart });
            console.log(result);
        } else {
            if (existingCart.cart.restaurantId.toString() === restaurantId) {
                let foodIndex = existingCart.cart.foodList.findIndex((food) => {
                    return food.foodId.toString() == foodItem.foodId;
                });

                if (foodIndex != -1) {
                    if (foodItem.quantity) {

                    }
                    existingCart.cart.foodList[foodIndex].quantity += 1;
                }
                else {
                    existingCart.cart.foodList.push(foodItem);
                }
                await userDataCollection.findByIdAndUpdate(id, { "cart": existingCart.cart });
            } else {

            }

        }
    }
}

exports.reduceCartItem = async (req, res, next) => {
    let id = req.body.userId;
    const foodItem = req.body.foodItem;
    const restaurantId = req.body.restaurantId;

    if (req.body.role == "user") {
        let existingCart = await userDataCollection.findById(id, { cart: 1 });

        if (existingCart.cart.foodList.length == 1 && existingCart.cart.foodList[0].quantity == 1) {
            await userDataCollection.findByIdAndUpdate(id, { "cart": undefined });
        }
        else {
            let foodIndex = existingCart.cart.foodList.findIndex((food) => {
                return food.foodId.toString() == foodItem.foodId;
            });
            if (existingCart.cart.foodList[foodIndex].quantity == 1) {
                existingCart.cart.foodList = existingCart.cart.foodList.filter((x) => { return x.foodId.toString() != foodItem.foodId });
            }
            else {
                existingCart.cart.foodList[foodIndex].quantity -= 1;
            }
            await userDataCollection.findByIdAndUpdate(id, { "cart": existingCart.cart });
        }

    }
}

exports.clearCart = async (req, res, next) => {
    let id = req.body.userId;
    await userDataCollection.findByIdAndUpdate(id, { "cart": undefined });
}


//Get user using id
exports.getUserById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params.id);
    userDataCollection.findById(id, function (err, user) {
        if (err) console.log(err.message);
        res.status(200).json({
            user: user
        })
    })
}
