import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { CustomAuthRequest } from "../interface/request/CustomAuthRequest";
import { CustomRequest } from "../interface/request/CustomRequest";
import UserService from "../services/UserService";
import CustomError from "../utils/CustomError";
import Helpers from "../utils/Helper";
import * as asyncErrorWrapper from "express-async-handler";
import * as path from "path";
class Users {
  getUser = asyncErrorWrapper(
    async (req: CustomAuthRequest<User>, res: Response, next: NextFunction) => {
      const id = req.user.id;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  );

  createUser = asyncErrorWrapper(
    async (req: CustomRequest<User>, res: Response, next: NextFunction) => {
      const data = req.body;
      req.body.password = Helpers.passwordToHash(req.body.password);
      const user = await UserService.create(data);
      res.status(200).send({
        data: user,
        message: "Successfully",
      });
    }
  );

  login = asyncErrorWrapper(
    async (req: CustomRequest<User>, res: Response, next: NextFunction) => {
      req.body.password = Helpers.passwordToHash(req.body.password);
      const data = req.body;
      const user = (await UserService.find(data)) as User;
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      const response = {
        ...user,
        tokens: {
          access_token: Helpers.generateAccessToken(user),
          refresh_token: Helpers.generateRefreshToken(user),
        },
      };
      res.status(200).send({
        data: response,
        message: "Successfully",
      });
    }
  );

updateUser = asyncErrorWrapper(
    async (req: CustomAuthRequest<User>, res: Response, next: NextFunction) => {
      const { id } = req.user;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      const { firstname, lastname, gender, username, email } = req.body;
      const data = {
        firstname,
        lastname,
        gender,
        email,
        username,
      };
      const response = await UserService.update(data, id);
      res.status(200).send({
        data: response,
        message: "Successfully",
      });
    }
  );

  deleteUser = asyncErrorWrapper(
    async (req: CustomAuthRequest<User>, res: Response, next: NextFunction) => {
      const { id } = req.user;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      await UserService.delete(id);
      res.status(200).send({
        message: "Successfully Delete",
      });
    }
  );

  changePassword = asyncErrorWrapper(
    async (req: CustomAuthRequest<User>, res: Response, next: NextFunction) => {
      const { id } = req.user;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      req.body.password = Helpers.passwordToHash(req.body?.password);
      const data = {
        password: req.body.password,
      };
      const response = await UserService.update(data, id);
      res.status(200).send({
        data: response,
        message: "Successfully",
      });
    }
  );

  updateProfileImage = asyncErrorWrapper(
    async (req: any, res: Response, next: NextFunction) => {
      if (req?.files?.profile_image?.length > 1) {
        return next(new CustomError("Up to 1 photos can be uploaded", 400));
      }
      if (!req?.files?.profile_image) {
        return next(new CustomError("Please select a file", 400));
      }
      if (req?.files?.profile_image?.mimetype.split("/")[0] !== "image") {
        return next(new CustomError("Please select just a image", 400));
      }
      const extension = path.extname(req.files.profile_image.name);
      const fileName = `${req?.user?.username.toLowerCase().split(" ")[0]}${
        req?.user?.id
      }${extension}`;
      const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
      req.files?.profile_image.mv(folderPath, async (err) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        const user = await UserService.update(
          {
            profile_image: `${process.env.BASE_URL_LOCAL}uploads/users/${fileName}`,
          },
          req.user.id
        );
        res.status(200).send(user);
      });
    }
  );
}

export default new Users();
