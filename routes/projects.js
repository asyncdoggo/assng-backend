import express from "express";
import cookieParser from "cookie-parser";
import Project from "../models/project.js"
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import moment from 'moment';


const ProjectRouter = express.Router()


// token validator middleware
function tokenRequired(req, res, next) {
    let token = req.headers.token
    if (token == null) return res.sendStatus(401)

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


ProjectRouter.get("/", tokenRequired, async (req, res) => {

    let page = req.query.page
    let size = req.query.size
    let sort = req.query.sort
    let search = req.query.search

    try {
        if (search) {

            const regex = new RegExp(search, "i");
            Project.find({ name: { $regex: regex } })
                .exec(function (err, projects) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        const formattedProjects = projects.map((projects) => {
                            return {
                                ...projects.toObject(),
                                start_date: moment(projects.start_date).format('MMM-D, YYYY'),
                                end_date: moment(projects.end_date).format('MMM-D, YYYY')
                            };
                        });
                        return res.status(201).json({ message: "success", projects: formattedProjects })
                    }
                })
        }
        else {
            Project.find({})
                .sort({ [sort]: 1 })
                .skip((page - 1) * size)
                .limit(size)
                .exec(async function (err, projects) {
                    if (err) {
                        console.log(err);
                    } else {
                        const formattedProjects = projects.map((project) => {
                            return {
                                ...project.toObject(),
                                start_date: moment(project.start_date).format('MMM-D, YYYY'),
                                end_date: moment(project.end_date).format('MMM-D, YYYY')
                            };
                        });
                        const totalProjects = await Project.countDocuments().exec();
                        const totalPages = Math.ceil(totalProjects / size);
                        res.status(201).json({ message: "success", projects: formattedProjects, pages: totalPages })
                    }
                })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})


ProjectRouter.post("/", tokenRequired, async (req, res) => {
    let user = req.body
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        reason: req.body.reason,
        division: req.body.division,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        location: req.body.location,
        status: "Registered"
    })
    try {
        const newProject = await project.save()
        res.status(201).json({ message: "success" });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})

ProjectRouter.put("/", tokenRequired, (req, res) => {
    const id = req.body.id
    const status = req.body.status

    Project.updateOne({ _id: id }, { $set: { status: status } }, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(404).json({ message: "failure" })
        } else {
            return res.status(200).json({ message: "success", status: status })
        }
    });
})



export default ProjectRouter;