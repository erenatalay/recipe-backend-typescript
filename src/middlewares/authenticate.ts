import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/CustomAuthRequest";
import { User } from "../interface/User";
const httpStatus = require("http-status");
const JWT = require("jsonwebtoken")

const authenticateToken = (req:CustomAuthRequest<User>,res:Response,next:NextFunction) => {
   const token = req.headers?.authorization?.split(" ")[1] || null
   if(token === null){
    return res.status(httpStatus.UNAUTHORIZED).send({error : "To do this, you must first login."})
   }

   JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user) => {
       if(err){
           return res.status(httpStatus.FORBIDDEN).send({error : err})
       }
       req.user = user;
       next();
   })
}

module.exports = authenticateToken;