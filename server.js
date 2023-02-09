import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import './routes/login.js'
import LoginRouter from "./routes/login.js";
import ProjectRouter from "./routes/projects.js";
import cookieParser from "cookie-parser";



config()

const app = express();

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
mongoose.set('strictQuery', false);

db.on("error", (err) => console.error(err))

db.once('open',() => console.log("connected to db"))


app.use(express.json())
app.use(cookieParser())


app.use("/login",LoginRouter)

app.use("/projects", ProjectRouter)


app.listen(3000, () => {
    console.log("server started at: http://localhost:3000")
})