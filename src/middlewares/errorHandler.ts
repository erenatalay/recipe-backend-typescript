
import { Request, Response, NextFunction,Errback } from "express";

module.exports = (error,req : Request,res : Response,next : NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message || "Internal Server Error."
        }
    })
}