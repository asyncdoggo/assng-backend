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
        type: String,
        required:true
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
        required:true
    },
})


export default mongoose.model('Porject',UsersSchema)