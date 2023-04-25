import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { TypeOrmError } from "../interface/error/TypeORMError";
import CustomError from "../utils/CustomError";
import { UniqueText } from "../utils/UniqueText";
import PostService from "../services/PostService";

class Posts {
  async getPosts(req: any, res: Response, next: NextFunction) {
    try {
      const post = await PostService.list({},["user","categories","photos"]);
      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async createPost(req: any, res: Response, next: NextFunction) {
    const { name, categoryId } = req.body;
    const { id } = req.user;
    try {
      const post = await PostService.create({
        name,
        categoryId: categoryId,
        userId: id,
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
