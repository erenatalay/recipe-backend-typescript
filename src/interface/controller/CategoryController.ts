import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../request/CustomAuthRequest";
import { Category } from "../model/Category";

export interface CategoryController {
    getCategory : (req: CustomAuthRequest<Category>,res: Response,next: NextFunction) => void
    findCategory : (req: CustomAuthRequest<Category>,res: Response,next: NextFunction) => void
    createCategory : (req: CustomAuthRequest<Category>,res: Response,next: NextFunction) => void
}