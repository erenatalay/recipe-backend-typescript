import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import PostPhotoService from "../services/PostPhotoService";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { Post } from "../interface/model/Post";
import { Get,Route,Tags } from "tsoa";
@Route("posts")
@Tags("Posts")
class Posts {
  @Get("/")
  async getPosts(
    req: CustomAuthRequest<Post>,
    res: Response,
    next: NextFunction
  ) {
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

  async createPost(
    req: CustomAuthRequest<Post>,
    res: Response,
    next: NextFunction
  ) {
    const { name, categoryId, photoId } = req.body;

    try {
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

  async updatePost(
    req: CustomAuthRequest<Post>,
    res: Response,
    next: NextFunction
  ) {
    const { name, categoryId, photoId } = req.body;
    const { id } = req.params as unknown as Post;
    const user = req.user;
    try {
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
          user: user.id,
          photos: photo,
        },
        id
      );
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

  async deletePost(
    req: CustomAuthRequest<Post>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as Post;
    const postFind = await PostService.find({ id });
    if (!postFind) {
      return next(new CustomError("There is no such post.", 400));
    }
    try {
      await PostService.delete(id);
      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async findPost(
    req: CustomAuthRequest<Post>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as Post;
    const postFind = await PostService.find({ id},["user", "categories", "photos"]);
    if (!postFind) {
      return next(new CustomError("There is no such post.", 400));
    }
    try {
      res.status(200).json({
        success: true,
        message: "Successfuly delete.",
        data: postFind,
      });
    } catch (error) {
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }
}

export default new Posts();
