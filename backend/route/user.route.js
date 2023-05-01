const express = require("express");
const { UserModel } = require("../model/user");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
userRoute.post("/register", async (req, res) => {
    try {
        let hash = await bcrypt.hash(req.body.password, 5)
        console.log(hash)
        // Store hash in your password DB.
        if (hash) {
            let data = { ...req.body, password: hash };
            await UserModel.insertMany([data]);
            res.json({ msg: "User Added" })
        } else {
            res.json({ err: "something went wrong" })
        }


    } catch (error) {
        console.log(error)
        res.send({ err: error })
    }
});

userRoute.post("/login", async (req, res) => {
    let { name, password } = req.body;
    try {
        let data = await UserModel.findOne({ name });
        console.log(data)
        bcrypt.compare(password, data.password, function (err, result) {
            // result == true
            console.log(result)
            if (result) {
                var token = jwt.sign({ id: data._id }, 'charlie', { expiresIn: '1h' });
                //localStorage.setItem("token", token)
                res.json({ msg: "login successful" ,token:token})
            } else {
                res.send({ msg: "Invalid password" })
            }
        });
    } catch (error) {
        res.json({ err: error })
    }
})


module.exports = { userRoute }