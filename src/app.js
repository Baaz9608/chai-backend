import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// use akser middleware k liye istemal hota
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,

}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser())

// routes import
import userRouter from '../src/routes/userroutes'
// routes declaration

app.use('api/v1/users', userRouter)
// http://localhost:3000/api/v1/users/register


export default app;