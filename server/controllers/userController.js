const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");

const userSchema = require('../models/userModel');
const auth = require("../helpers/authAPI");
const app = require("../server");
const generateOtp= require("../helpers/generateOtp");
const sendOtp= require("../helpers/sendOtp");

// user schema
const userDataCollection = mongoose.model('user', userSchema, 'users');


// Get all users
exports.getUsers = async (req, res, next) => {
    let users = await userDataCollection.find({});
    res.send(users);
}

// user authentication login 
exports.loginUser = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email);
    

    let user = await userDataCollection.findOne({ 'email': email });
    console.log("userRole",user);

    if (user && password === user.password) {
        const token = jwt.sign({ userId: user._id, email: user.email, password: user.password, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log('token',token)
        req.session.token = token;
        return res.status(200).json({ token: token});
    }
    else if (!user) {
        res.status(404).json({ message: "User not found ! Register yourself first.." });
    }
    else {
        res.status(400).json({ message: "Email or Password does not match!" });
    }
}

exports.logoutUser = (req, res, next) => {
    req.session.name = null;
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
                    landmark: req.body.landmark,
                    area: req.body.area,
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
        if (err){ console.log(err.message);
            res.send(err);   }
        else {
            console.log("User Data======>", user);
        }
    })

}


// update profile data of user
exports.updateUser = async (req, res, next) => {
    let id = req.body.userId;
    let updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber
    }
    await userDataCollection.findByIdAndUpdate(id, updateData);
};



exports.resetPassword = async (req, res, next) => {
    let email = req.body.email;
    let newPassword = req.body.newPassword;
    let updateData = {
        password : newPassword
    }
    let user = await userDataCollection.findOne({ 'email': email });
    if(user){
        let data=await userDataCollection.updateOne({email:email}, updateData);
        res.send(data);
    }
    else{
        res.send("User doesn't exist, register first!");
    }    
}



// Add to cart
exports.addToCart = async (req, res, next) => {
    let id = req.body.userId;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;
    const foodItem = {
        foodId:foodId,
        quantity : 1
    };
    console.log(">>>>>>" + req.body.role);

    let result;
    if (req.body.role == "user") {

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
    let id = mongoose.Types.ObjectId(req.body.userId);
    const foodItem = req.body;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;

    let result;

    if (req.body.role == "user") {
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

    let id = mongoose.Types.ObjectId(req.body.userId);
    const foodItem = req.body;
    const restaurantId = req.body.restaurantId;
    const foodId = req.body.foodId;

    if (req.body.role == "user") {
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
    let id = mongoose.Types.ObjectId(req.body.userId);
    console.log(id);
    let result = await userDataCollection.updateOne({ _id: id }, { $unset: { cart: 1 } });
    res.send(result);
}


//Get user using id
exports.getUserById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.body.userId);
    userDataCollection.findById(id, function (err, user) {
        if (err) console.log(err.message);
        res.status(200).json({
            user: user
        })
    })
}


exports.sendOtpForResetPassword= (req,res,next)=>{
    otp= generateOtp.generateOtp();
    email= req.body.email;
console.log(email);

    sendOtp.sendOtpForResetPassword(email,otp);
    
    res.send(otp);
}
exports.addDeRating= async (req,res,next)=> {

    const userId=req.body.userId;
    deId=req.body.deId;
    deRating={
        userId:userId,
        rating: req.body.rating
    }

    // let deData=await userDataCollection.findById(deId);

    // let de=deData.deliveryExecutive;
    // console.log(deData);

    // let deRatingArr=deData.deliveryExecutive.deliveryExecutiveRatings;

    let result=await userDataCollection.updateOne({_id:deId},{$push:{'deliveryExecutive.deliveryExecutiveRatings':deRating}});
 
    // console.log(deRatingArr);
    res.send(result);
}


