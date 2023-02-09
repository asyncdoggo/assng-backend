import express from "express";
import cookieParser from "cookie-parser";
import Project from "../models/project.js";
import jsonwebtoken from "jsonwebtoken";


const ProjectRouter = express.Router()


// token validator middleware
function tokenRequired(req,res,next) {
    let token = req.cookies.token
    if (token == null) return res.sendStatus(401)
  
    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}





ProjectRouter.get("/", tokenRequired, async (req,res) => {
    try{
        let user = req.user;
        //TODO
        const projects = await Project.find();
        res.json(projects)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


ProjectRouter.post("/", tokenRequired,async (req,res) => {
    let user = req.user
    const project =  new Project({
        name: req.body.name,
        type: req.body.type,
        division: req.body.division,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        location: req.body.location,
        status: req.body.status
    }) 
    try{
        const newProject = await project.save()
        res.status(201).json(newProject);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

ProjectRouter.get("/:id",getProjects, tokenRequired, (req,res) => {
    res.json(res.project)
})



// middleware
async function getProjects(req,res,next) {
    let project
   try{
        project = await Project.findById(req.params.id)
        if(project == null){
            return res.status(404).json({message: "Cannot find Project"})
        }
   } 
   catch(err){
    return res.status(500).json({message: err.message})
   }

   res.project = project
   next()
}



export default ProjectRouter;