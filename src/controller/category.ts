import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import CategoryService from "../services/CategoryService";
import { Category } from "../interface/model/Category";
import { TypeOrmError } from "../interface/error/TypeORMError";
import CustomError from "../utils/CustomError";
import { UniqueText } from "../utils/UniqueText";
import * as asyncErrorWrapper from "express-async-handler";

class Categories {
  getCategory = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Category>,
      res: Response,
      next: NextFunction
    ) => {
      const category = await CategoryService.list();
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  );

  findCategory = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Category>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Category;
      const category = await CategoryService.find({ id });
      if (!category) {
        return next(new CustomError("There is no such thing.", 400));
      }
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  );

  createCategory = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Category>,
      res: Response,
      next: NextFunction
    ) => {
      const { name } = req.body;
      const category = await CategoryService.create({ name });
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  );

  updateCategory = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Category>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Category;
      const categoryFind = await CategoryService.find({ id });
      if (!categoryFind) {
        return next(new CustomError("There is no such thing.", 400));
      }
      const { name } = req.body;
      const category = await CategoryService.update({ name }, id);
      if (!category) {
        return next(new CustomError("There is no such thing.", 400));
      }
      res.status(200).json({
        success: true,
        data: category,
      });
    }
  );

  deleteCategory = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<Category>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as Category;
      const category = await CategoryService.find({ id });
      if (!category) {
        return next(new CustomError("There is no such thing.", 400));
      }
      await CategoryService.delete(id);
      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );
}

export default new Categories();
