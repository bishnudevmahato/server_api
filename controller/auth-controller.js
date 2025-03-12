// const express = require.express();

const User = require("../models/user-model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

// ------------------ Home Page ------------------ //
const home = async (req, res) => {
    try {
        res
        .status(200)
        .send("Welcome to the MERN2024 Home Page");

    } catch (error) {
        console.log(error);
    }
}

// ------------------ Register Page ------------------ //
const register = async (req, res) => {
    try {
        // console.log(req.body);
        // res
        // .status(200)
        // // .send("Welcome to the MERN2024 Register Page");
        // .json( { message:req.body });

        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({ message: "User Already Exist!" });
        }

        // bcrypt password
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        await User.create({username, email, phone, password : hashPassword});
        res.status(200).json({ 
            msg : "User Created Successfully!",
            // token :  await userCreated.generateToken(),
            // userId : userCreated._id.toString(),
        });

    } catch (error) {
        console.log(error);
    }
}

// ------------------ Login Page ------------------ //
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExit = await User.findOne({ email });
        console.log(userExit);

        if(!userExit){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // const user = await bcrypt.compare(password, userExit.password);
        const user = await userExit.comparePassword(password);
        console.log(user);

        if(user) {
            res.status(200).json({ 
                msg : "Login Successfully!",
                // token :  await userCreated.generateToken(),
                // userId : userCreated._id.toString(),
            });
        }else{
            res.status(400).json({ message : "Invalid email and password"})
        }

        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { home, register, login };