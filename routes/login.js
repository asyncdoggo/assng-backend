import express from "express";
import generateAccessToken from "../jwt.js";
import User from "../models/user.js";
import * as argon2 from "argon2";

const LoginRouter = express.Router();

LoginRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// register
LoginRouter.post("/", async (req, res) => {
    try {
        const pwhash = await argon2.hash(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: pwhash,
        });
        const newUser = await user.save();
        let token = generateAccessToken(newUser.username);
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.status(201).json({ status: "success" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login user
LoginRouter.put("/", async (req, res) => {
    try {
        var user = await User.findOne({
            username: req.body.username
         }).exec();
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        const pwhash = user.password
        if(!await argon2.verify(pwhash,req.body.password)){
            return res.status(400).json({message: "Password is incorrect"})
        }


    } catch (err) {
        return res.status(400).json(err.message);
    }

    const token = generateAccessToken(user.username);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(201).json({ status: "success" });
});

// // middleware
// async function getUsers(req,res,next) {
//     let user
//    try{
//         user = await User.findById(req.params.id)
//         if(user == null){
//             return res.status(404).json({message: "Cannot find user"})
//         }
//    }
//    catch(err){
//     return res.status(500).json({message: err.message})
//    }

//    res.user = user
//    next()
// }

export default LoginRouter;
