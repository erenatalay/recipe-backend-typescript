import { Request, Response, NextFunction } from "express";
import PostPhotoService from "../services/PostPhotoService";
import CustomError from "../utils/CustomError";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { PostPhoto } from "../interface/model/PostPhoto";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as asyncErrorWrapper from "express-async-handler";

class PostPhotos {
  getPostPhotos = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<PostPhoto>,
      res: Response,
      next: NextFunction
    ) => {
      const { postId } = req.params as unknown as PostPhoto;
      const postPhotoFind = await PostPhotoService.find(
        { post: { id: postId } },
        ["post"]
      );
      if (!postPhotoFind) {
        return next(new CustomError("There is no such post.", 400));
      }
      const postPhoto = await PostPhotoService.list({ post: { id: postId } }, [
        "post",
      ]);
      res.status(200).send(postPhoto);
    }
  );
  createPostPhotos = asyncErrorWrapper(
    async (req: any, res: Response, next: NextFunction) => {
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
      const postPhoto = await PostPhotoService.create(images);
      res.status(200).send(postPhoto);
    }
  );

  updatePostPhotos = asyncErrorWrapper(
    async (req: any, res: Response, next: NextFunction) => {
      const { id } = req.params as unknown as PostPhoto;
      const postPhoto = (await PostPhotoService.find({ id })) as PostPhoto;
      if (req?.files?.images?.length > 1) {
        return next(new CustomError("Up to 1 photos can be uploaded", 400));
      }
      if (!req?.files?.images) {
        return next(new CustomError("Please select a file", 400));
      }
      if (req?.files?.images?.mimetype.split("/")[0] !== "image") {
        return next(new CustomError("Please select just a image", 400));
      }
      const currentPhoto = `${postPhoto.image.replace(
        `${process.env.BASE_URL_LOCAL}uploads/posts/`,
        ""
      )}`;
      const currentFolderPath = path.join(
        __dirname,
        "../",
        "uploads/posts",
        currentPhoto
      );
      fs.unlink(currentFolderPath, async () => {});
      const extension = path.extname(req.files.images.name);
      const fileName = `${uuidv4()}${extension}`;
      const folderPath = path.join(__dirname, "../", "uploads/posts", fileName);

      req.files?.images.mv(folderPath, async (err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        const image = {
          image: `${process.env.BASE_URL_LOCAL}uploads/posts/${fileName}`,
        };
        const postPhoto = await PostPhotoService.update(image, id);
        res.status(200).send(postPhoto);
      });
    }
  );

  deletePostPhotos = asyncErrorWrapper(
    async (req: any, res: Response, next: NextFunction) => {
      const { id } = req.params as unknown as PostPhoto;
      const postPhoto = (await PostPhotoService.find({ id })) as PostPhoto;
      const fileName = `${postPhoto.image.replace(
        `${process.env.BASE_URL_LOCAL}uploads/posts/`,
        ""
      )}`;
      const folderPath = path.join(__dirname, "../", "uploads/posts", fileName);
      fs.unlink(folderPath, async () => {
        await PostPhotoService.delete(id);
        res.status(200).send({
          success: true,
          message: "Successfully delete photo",
        });
      });
    }
  );
}

export default new PostPhotos();
