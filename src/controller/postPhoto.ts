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
  async getPostPhotos(req:  CustomAuthRequest<PostPhoto>, res: Response, next: NextFunction) {
    const { postId } = req.params as unknown as PostPhoto;
    const postPhoto = await PostPhotoService.find({ post : {id : postId}},["post"]);
    if (!postPhoto) {
      return next(new CustomError("There is no such post.", 400));
    }
    try {
      const postPhoto = await PostPhotoService.list({ post : {id : postId}},["post"]);
      console.log(23232)
      res.status(200).send(postPhoto);
    } catch (error) {
      res.status(500).send({
        error : "Server Internal Error",
      });
    }
  }
  async createPostPhotos(req: any, res: Response, next: NextFunction) {
    if (!req?.files?.images) {
      return next(new CustomError("Please select a file", 400));
    }
    if (!req?.files?.images?.length) {
      req.files.images = [req.files.images];
    }
    if (req?.files?.images?.length > 6) {
      return next(new CustomError("Up to 6 photos can be uploaded", 400));
    }
    const checkImage = req?.files?.images?.every((item) => {
      return item?.mimetype.split("/")[0] == "image";
    });
    if (!checkImage) {
      return next(new CustomError("Please select just a image", 400));
    }
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
      const imageUrl = {
        image: `${process.env.BASE_URL_LOCAL}uploads/posts/${imagePath[index]}`,
      };

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

  async updatePostPhotos(req: any, res: Response, next: NextFunction) {
    const { id } = req.params as unknown as PostPhoto;
    const postPhoto  = await PostPhotoService.find({id}) as PostPhoto;

    if (!req?.files?.images) {
      return next(new CustomError("Please select a file", 400));
    }
    if (req?.files?.images?.mimetype.split("/")[0] !== "image") {
      return next(new CustomError("Please select just a image", 400));
    }
    const extension = path.extname(req.files.images.name);
    const fileName =  `${postPhoto.image.replace(`${process.env.BASE_URL_LOCAL}uploads/posts/`,"").split(".")[0]}${extension}`;
    const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
    req.files?.images.mv(folderPath, async (err) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      const image = {
        image: `${process.env.BASE_URL_LOCAL}uploads/posts/${fileName}`,
      };
    try {
      const postPhoto = await PostPhotoService.update(image,id);
      res.status(200).send(postPhoto);
    } catch (error) {
      res.status(500).send({
        error: "Upload Error",
      });
    }
  });

  }
}

export default new PostPhotos();
