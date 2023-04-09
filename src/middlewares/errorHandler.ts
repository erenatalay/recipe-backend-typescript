import { Request, Response, NextFunction, Errback } from "express";
import { CustomError } from "../interface/error/CustomError";

export default  (error : CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Internal Server Error.",
    },
  });
};
