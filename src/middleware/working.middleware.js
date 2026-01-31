import { slidingWindow } from "./slidingWindowLimiter.middleware.js";
import { redisClient } from "../config/redisClient.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";

const limiter=new slidingWindow(redisClient,60000,10);

const slidingLimiter=asyncHandler(async(req , res , next)=>{
    const ip=req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    const currentTime=Date.now().toString();
    const logMsg =`${ip} | ${currentTime}`;

    fs.appendFile('ip.txt', logMsg, (err) => {
        if (err) {
            console.error("Failed to log IP:", err);
        }
    });
    
    const isAllowed=await limiter.allowRequests(ip);

    if(isAllowed){
        next();
    }
    else{
        res.status(429).json({
            "success":"false",
            "message" : "Too many requests, please try again later."
        })
    }
})

export {slidingLimiter}