import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { CategoryController } from "../interface/controller/CategoryController";
import CategoryService from "../services/CategoryService";
import { Category } from "../interface/model/Category";

class Categories  {
  async getCategory(req: CustomAuthRequest<Category>,res: Response,next: NextFunction) {
    try {
      const category = await CategoryService.list();
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }
}

export default new Categories();
