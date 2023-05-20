import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import WishService from "../services/WishService";
import PostService from "../services/PostService";
import CustomError from "../utils/CustomError";
import { WishList } from "../interface/model/Wishlist";

class WhisList {
  async getWhislist(
    req: CustomAuthRequest<WishList>,
    res: Response,
    next: NextFunction
  ) {
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

  async findWhislist(
    req: CustomAuthRequest<WishList>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as WishList;

    try {
      const wishList = await WishService.find({id}, [
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
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async createWhislist(
    req: CustomAuthRequest<WishList>,
    res: Response,
    next: NextFunction
  ) {
    const { postId } = req.body;

    try {
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
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }

  async deleteWhislist(
    req: CustomAuthRequest<WishList>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params as unknown as WishList;
    try {
      const wishList = await WishService.find({ id });
      if (!wishList) {
        return next(new CustomError("There is no such wishlist.", 400));
      }
      await WishService.delete(id);
      res.status(200).json({
        success: true,
        message: "Successfuly Delete.",
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
