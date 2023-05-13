import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import PostPhotoService from "../services/PostPhotoService";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { Post } from "../interface/model/Post";

class WhisList {
  async getWhislist(
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

}

export default new WhisList();
