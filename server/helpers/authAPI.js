var mongoose = require("mongoose");
const userSchema = require('../models/userModel');

const jwt = require('jsonwebtoken');
const userDataCollection = mongoose.model('user', userSchema, 'users');

const authAPI = async function (req, res, next) {
    console.log("heloooo");

    const authHeader = req.header('authorization');

    console.log(authHeader);


    try {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if(err)
            {
                console.log(err);
                throw err;
            }
            console.log(decoded);

        var isUser = await userDataCollection.findOne({ 'email': decoded.email, 'password': decoded.password }).exec();
        if (isUser != null) {
            req.body.userId = decoded.userId;
            req.body.email = decoded.email;
            req.body.password = decoded.password;
            req.body.role = decoded.role;
            next();
        }
        else {
            throw new Error("not authorized");
        }
    });

    } catch (e) {
        console.log(e);

        res.status(400).send({ message: "Unauthorized Request" });
    }
};

module.exports = {
    authAPI
};
