import express from "express";

import User from "../models/user.js";

const LoginRouter = express.Router()


LoginRouter.get("/", async (req,res) => {
    try{
        const users = await User.find();
        res.json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


LoginRouter.post("/", async (req,res) => {
    const user =  new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }) 
    try{
        const newUser = await user.save()
        res.status(201).json(newUser);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

LoginRouter.get("/:id",getUsers, (req,res) => {
    res.json(res.user)
})



// middleware
async function getUsers(req,res,next) {
    let user
   try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: "Cannot find user"})
        }
   } 
   catch(err){
    return res.status(500).json({message: err.message})
   }

   res.user = user
   next()
}



export default LoginRouter