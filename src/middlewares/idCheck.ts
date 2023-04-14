import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

const idChecker = (field? : number) => (req: Request, res: Response, next: NextFunction) => {
    const idField = field || "id";
    if (!req?.params[idField]) {
      next(new CustomError("Lütfen geçerli bir id giriniz.", 400));
      return;
    }
    next();
  };

export { idChecker };
