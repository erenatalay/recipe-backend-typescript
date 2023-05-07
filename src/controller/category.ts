import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { CategoryController } from "../interface/controller/CategoryController";
import CategoryService from "../services/CategoryService";
import { Category } from "../interface/model/Category";
import { TypeOrmError } from "../interface/error/TypeORMError";
import CustomError from "../utils/CustomError";
import { UniqueText } from "../utils/UniqueText";

class Categories {
  async getCategory(
    req: CustomAuthRequest<Category>,
    res: Response,
    next: NextFunction
  ) {
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

  async findCategory(
    req: CustomAuthRequest<Category>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as Category;
    try {
      const category = await CategoryService.find({ id });
      if (!category) {
        return next(new CustomError("There is no such thing.", 400));
      }
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

  async createCategory(
    req: CustomAuthRequest<Category>,
    res: Response,
    next: NextFunction
  ) {
    const { name } = req.body;
    try {
      const category = await CategoryService.create({ name });
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      const uniqueError: TypeOrmError = error;
      if (uniqueError?.driverError?.code === "23505") {
        return next(
          new CustomError(UniqueText(uniqueError.driverError.detail), 400)
        );
      }
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async updateCategory(
    req: CustomAuthRequest<Category>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as Category;
    const category = await CategoryService.find({ id });
    if (!category) {
      return next(new CustomError("There is no such thing.", 400));
    }
    const { name } = req.body;
    try {
      const category = await CategoryService.update({ name }, id);
      if (!category) {
        return next(new CustomError("There is no such thing.", 400));
      }
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      const uniqueError: TypeOrmError = error;
      if (uniqueError?.driverError?.code === "23505") {
        return next(
          new CustomError(UniqueText(uniqueError.driverError.detail), 400)
        );
      }
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async deleteCategory(
    req: CustomAuthRequest<Category>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as Category;
    const category = await CategoryService.find({ id });
    if (!category) {
      return next(new CustomError("There is no such thing.", 400));
    }
    try {
      await CategoryService.delete(id);

      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    } catch (error) {
      const uniqueError: TypeOrmError = error;
      if (uniqueError?.driverError?.code === "23505") {
        return next(
          new CustomError(UniqueText(uniqueError.driverError.detail), 400)
        );
      }
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }
}

export default new Categories();
