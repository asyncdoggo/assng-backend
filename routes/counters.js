import express from "express";
import Project from "../models/project.js";
import jsonwebtoken from "jsonwebtoken";
import project from "../models/project.js";


const counterRouter = express.Router()


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




counterRouter.get("/", tokenRequired, async (req,res) => {
    try{
       const counters = await project.aggregate(
            [
                {
                    '$group': {
                        '_id': '$status', 
                        'count': {
                          '$sum': 1
                        }
                    }
                }
            ]
       ).exec()

       const delayed = await project.aggregate(
        [
            {
              '$match': {
                'end_date': {
                  '$lt': new Date()
                }, 
                'status': 'Running'
              }
            }, {
              '$group': {
                '_id': 'Delayed', 
                'count': {
                  '$sum': 1
                }
              }
            }
          ]
   ).exec()

    let data = counters.concat(delayed)
    return res.status(201).json({message:"success","counters":data})
    }
    catch(err){
       return res.status(500).json({message: err.message})
    }
})



export default counterRouter;