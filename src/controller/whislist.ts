import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import WishService from "../services/WishService";
import PostService from "../services/PostService";
import CustomError from "../utils/CustomError";
import { WishList } from "../interface/model/Wishlist";
import * as asyncErrorWrapper from "express-async-handler";
class WhisList {
  getWhislist = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<WishList>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const post = await WishService.list({}, [
          "user",
          "post",
          "post.categories",
          "post.photos",
        ]);
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
  );

  findWhislist = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<WishList>,
      res: Response,
      next: NextFunction
    ) => {
      const { id } = req.params as unknown as WishList;
      const wishList = await WishService.find({ id }, [
        "user",
        "post",
        "post.categories",
        "post.photos",
      ]);
      if (!wishList) {
        return next(new CustomError("There is no such wishlist.", 400));
      }
      res.status(200).json({
        success: true,
        data: wishList,
      });
    }
  );

  createWhislist = asyncErrorWrapper(
    async (
      req: CustomAuthRequest<WishList>,
      res: Response,
      next: NextFunction
    ) => {
      const { postId } = req.body;
      const post = await PostService.find({ id: postId }, [
        "categories",
        "photos",
      ]);
      if (!post) {
        return next(new CustomError("There is no such post.", 400));
      }
      const wishlist = await WishService.create({
        user: req.user,
        post,
      });
      res.status(200).json({
        success: true,
        data: wishlist,
      });
    }
  );

   deleteWhislist = asyncErrorWrapper(async (
    req: CustomAuthRequest<WishList>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params as unknown as WishList;
      const wishList = await WishService.find({ id });
      if (!wishList) {
        return next(new CustomError("There is no such wishlist.", 400));
      }
      await WishService.delete(id);
      res.status(200).json({
        success: true,
        message: "Successfuly Delete.",
      });
  })
}

export default new WhisList();
