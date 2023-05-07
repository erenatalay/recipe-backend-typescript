import { Request, Response, NextFunction } from "express";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
import PostPhotoService from "../services/PostPhotoService";
import { In } from "typeorm";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { PostPhoto } from "../interface/model/PostPhoto";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
class PostPhotos {
  async createPostPhotos(req: any, res: Response, next: NextFunction) {
    if (!req?.files?.images) {
      return next(new CustomError("Please select a file", 400));
    }
    req?.files?.images?.map((item) => {
      if (item?.mimetype.split("/")[0] !== "image") {
        return next(new CustomError("Please select just a image", 400));
      }
    });

    const imagePath = req?.files?.images?.map((item) => {
      const extension = path.extname(item.name);
      return `${uuidv4()}${extension}`;
    });
    const folderPath = imagePath.map((item) => {
      return path.join(__dirname, "../", "uploads/posts", item);
    });
    const images = folderPath.map((item, index) => {
      req.files?.images[index].mv(item, async (err) => {
        if (err) {
            return res.status(500).send({ error: err });
          }
      });
      const imageUrl =  {
          image: `${process.env.BASE_URL_LOCAL}uploads/posts/${imagePath[index]}`,
        }
      
      return imageUrl;
    });

    try {
      const postPhoto = await PostPhotoService.create(images);
      res.status(200).send(postPhoto);
    } catch (error) {
      res.status(500).send({
        error: "Upload Error",
      });
    }
  }
}

export default new PostPhotos();
