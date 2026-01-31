import express from "express"
import dotenv from "dotenv"
import { slidingLimiter } from "./middleware/working.middleware.js";

dotenv.config();

const app=express();

app.use(slidingLimiter);

app.get("/",(req , res)=>{
    return res.send("HI SERVER ALLOWED")
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})
