import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,//fron .env
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
//routes declaration
//app.get() is used to define a route that handles HTTP GET requests.
//app.use() is used to apply middleware functions to your application
app.use("/api/v1/users",userRouter)
export default app;
