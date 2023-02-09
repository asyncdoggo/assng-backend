import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    }
})


export default mongoose.model('User',UsersSchema)