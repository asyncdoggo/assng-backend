import express from "express";
import cookieParser from "cookie-parser";
import Project from "../models/project.js";
import jsonwebtoken from "jsonwebtoken";


const ProjectRouter = express.Router()


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


ProjectRouter.get("/", tokenRequired, async (req,res) => {

    let page = req.query.page
    let size = req.query.size

    try{
        const projects = await Project.find()
        // .sort({_id:1})
        .skip((page - 1) * size)
        .limit(size);
        const totalProjects = await Project.countDocuments();
        const totalPages = Math.ceil(totalProjects / size);
        res.status(201).json({message:"success", projects:projects, pages:totalPages} )
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


ProjectRouter.post("/", tokenRequired,async (req,res) => {
    let user = req.body
    const project =  new Project({
        name: req.body.name,
        type: req.body.type,
        reason:req.body.reason,
        division: req.body.division,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        location: req.body.location,
        status: "Registered"
    }) 
    try{
        const newProject = await project.save()
        res.status(201).json({message:"success"});
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: err.message})
    }
})

ProjectRouter.get("/:id", tokenRequired, (req,res) => {
    res.json(res.project)
})



export default ProjectRouter;