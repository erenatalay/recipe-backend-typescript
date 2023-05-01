import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import PostPhotoService from "../services/PostPhotoService";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";

class Posts {
  async getPosts(req: any, res: Response, next: NextFunction) {
    try {
      const post = await PostService.list({}, ["user", "categories", "photos"]);
      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async createPost(req: any, res: Response, next: NextFunction) {
    const { name, categoryId, photoId } = req.body;
    const { id } = req.user;
    try {
      const category = await CategoryService.list({id : In(categoryId)});
      const photo = await PostPhotoService.list({id : In(photoId)});
      if (category?.length == 0) {
        return next(new CustomError("Your category selection is wrong",400))
      }
      if (photo?.length == 0) {
        return next(new CustomError("Your photo selection is wrong",400))
      }
      const post = await PostService.create({
        name,
        categories: category,
        user: id,
        photos : photo
      });
      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }
}

export default new Posts();
