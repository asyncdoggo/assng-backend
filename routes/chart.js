import express from "express";
import Project from "../models/project.js";
import jsonwebtoken from "jsonwebtoken";
import project from "../models/project.js";


const chartRouter = express.Router()


// token validator middleware
function tokenRequired(req,res,next) {
    let token = req.headers.token
    if (token == null) return res.sendStatus(401)
  
    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}




chartRouter.get("/", tokenRequired, async (req,res) => {
    try{
       const chart = await project.aggregate(
        [
            {
              $group: {
                _id: "$department",
                registered_count: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Registered"] },
                      1,
                      0
                    ]
                  }
                },
                closed_count: {
                  $sum: {
                    $cond: [
                      { $eq: ["$status", "Closed"] },
                      1,
                      0
                    ]
                  }
                }
              }
            },
            {
              $project: {
                _id: 1,
                registered_count: 1,
                closed_count: 1,
              }
            },
            {
              $addFields: {
                registered_count: {
                  $ifNull: ["$registered_count", 0]
                },
                closed_count: {
                  $ifNull: ["$closed_count", 0]
                }
              }
            }
          ]
       ).exec()

      
    return res.status(201).json({message:"success",data:chart})
    }
    catch(err){
       return res.status(500).json({message: err.message})
    }
})



export default chartRouter;