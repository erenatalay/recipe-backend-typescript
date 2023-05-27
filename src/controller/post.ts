import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import PostPhotoService from "../services/PostPhotoService";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { Post } from "../interface/model/Post";
import * as asyncErrorWrapper from "express-async-handler";
import PostElasticSearch from "../../elasticsearch/service/PostElasticSearch";
class Posts {
  getPosts = asyncErrorWrapper(
    async (req: CustomAuthRequest<Post>, res: Response, next: NextFunction) => {
      const post = await PostService.list({}, ["user", "categories", "photos"]);
      res.status(200).json({
        success: true,
        data: post,
      });
    }
  );

  createPost = asyncErrorWrapper(
    async (req: CustomAuthRequest<Post>, res: Response, next: NextFunction) => {
      const { name, categoryId, photoId } = req.body;
      const category = await CategoryService.list({ id: In(categoryId) });
      const photo = await PostPhotoService.list({ id: In(photoId) });
      if (category?.length == 0) {
        return next(new CustomError("Your category selection is wrong", 400));
      }
      const post = await PostService.create({
        name,
        categories: category,
        user: req.user,
        photos: photo,
      }) as Post;
      PostElasticSearch.createIndex(post)
      res.status(200).json({
        success: true,
        data: post,
      });
    }
  );

  updatePost = asyncErrorWrapper(
    async (req: CustomAuthRequest<Post>, res: Response, next: NextFunction) => {
      const { name, categoryId, photoId } = req.body;
      const { id } = req.params as unknown as Post;
      const user = req.user;
      const category = await CategoryService.list({ id: In(categoryId) });
      const photo = await PostPhotoService.list({ id: In(photoId) });
      const postFind = await PostService.find({ id });
      if (!postFind) {
        return next(new CustomError("There is no such post.", 400));
      }
      if (category?.length == 0) {
        return next(new CustomError("Your category selection is wrong", 400));
      }
      const post = await PostService.update(
        {
          name,
          categories: category,
          user: user,
          photos: photo,
        },
        id
      );
      PostElasticSearch.updateIndex(post)

      res.status(200).json({
        success: true,
        data: post,
      });
    }
  );

  deletePost = asyncErrorWrapper(
    async (req: CustomAuthRequest<Post>, res: Response, next: NextFunction) => {
      const { id } = req.params as unknown as Post;
      const postFind = await PostService.find({ id });
      if (!postFind) {
        return next(new CustomError("There is no such post.", 400));
      }
      await PostService.delete(id);
      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    }
  );

  findPost = asyncErrorWrapper(
    async (req: CustomAuthRequest<Post>, res: Response, next: NextFunction) => {
      const { id } = req.params as unknown as Post;
      const postFind = await PostService.find({ id }, [
        "user",
        "categories",
        "photos",
      ]);
      if (!postFind) {
        return next(new CustomError("There is no such post.", 400));
      }
      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
        data: postFind,
      });
    }
  );
}

export default new Posts();
