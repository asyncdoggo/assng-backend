import mongoose from "mongoose";


const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    reason: {
        type: String,
        required:true,
        enum: ["Business","Dealership","Transport"]
    },
    type: {
        type: String,
        required:true,
        enum: ["Internal", "External", "Vendor"]
    },
    division: {
        type: String,
        required:true,
    },
    category: {
        type: String,
        required:true,
        enum: ["A","B","C","D"]
    },
    priority: {
        type: Number,
        required:true,
        enum: [0,1,2]
    },
    department: {
        type: String,
        required:true
    },
    start_date: {
        type: Date,
        required:true
    },
    end_date: {
        type: Date,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true,
        enum: ["Registered","Closed","Cancelled"]
    },
})


export default mongoose.model('Project',ProjectSchema)