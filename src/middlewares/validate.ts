import { Request, Response, NextFunction } from "express";

const validate = (schema) => (req:Request, res:Response, next:NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if(error){
        const errorMessage = error.details?.map(detail => detail.message).join(", ");

        res.status(400).json({error : errorMessage.replace(/["']/g, "")})

        return;
    }

    Object.assign(req,value);
    return next();
}

module.exports = validate;