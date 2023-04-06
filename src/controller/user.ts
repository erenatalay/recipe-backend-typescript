import { UserController } from "./../interface/UserController";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { UniqueText } from "../utils/UniqueText";
import { CustomAuthRequest } from "../interface/CustomAuthRequest";
import { CustomRequest } from "../interface/CustomRequest";
import { TypeOrmError } from "../interface/TypeORMError";
import UserService from "../services/UserService";
import CustomError from "../utils/CustomError";
import Helpers from "../utils/Helper";
import * as path from "path";
class Users implements UserController {
  async getUser(
    req: CustomAuthRequest<User>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user.id;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: "Server Internal Error",
      });
    }
  }
  async createUser(
    req: CustomRequest<User>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      req.body.password = Helpers.passwordToHash(req.body.password);
      const user = await UserService.create(data);
      res.status(200).send({
        data: user,
        message: "Successfully",
      });
    } catch (error) {
      const uniqueError: TypeOrmError = error;
      if (uniqueError?.driverError?.code === "23505") {
        return next(
          new CustomError(UniqueText(uniqueError.driverError.detail), 400)
        );
      }
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async login(req: CustomRequest<User>, res: Response, next: NextFunction) {
    req.body.password = Helpers.passwordToHash(req.body.password);
    try {
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
    } catch (error) {
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async updateUser(
    req: CustomAuthRequest<User>,
    res: Response,
    next: NextFunction
  ) {
    try {
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
    } catch (error) {
      const uniqueError: TypeOrmError = error;
      if (uniqueError?.driverError?.code === "23505") {
        return next(
          new CustomError(UniqueText(uniqueError.driverError.detail), 400)
        );
      }
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async deleteUser(
    req: CustomAuthRequest<User>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const user = await UserService.find({ id });
      if (!user) {
        return next(new CustomError("There is no such user", 400));
      }
      await UserService.delete(id);
      res.status(200).send({
        message: "Successfully Delete",
      });
    } catch (error) {
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async changePassword(
    req: CustomAuthRequest<User>,
    res: Response,
    next: NextFunction
  ) {
    try {
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
    } catch (error) {
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async updateProfileImage(req, res, next) {
    if (!req?.files?.profile_image) {
      return next(new CustomError("Please select a file", 400));
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

      try {
        const user = await UserService.update(
          {
            profile_image: `${process.env.BASE_URL_LOCAL}uploads/users/${fileName}`,
          },
          req.user.id
        );
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send({
          error: "Upload  başarılı fakat kayıt sırasında bir problem oluştu.",
        });
      }
    });
  }
}

export default new Users();
