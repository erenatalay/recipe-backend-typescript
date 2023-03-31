import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { CustomAuthRequest } from "../interface/CustomAuthRequest";
import { CustomRequest } from "../interface/CustomRequest";
const UserService = require("../services/UserService");
const CustomError = require("../helpers/CustomError");
const Helpers = require("../utils/helper");
class Users {
  async getUser(req: CustomAuthRequest<User>, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const user = await UserService.find({ id });
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
  async createUser(req:  CustomRequest<User>, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      req.body.password = Helpers.passwordToHash(req.body.password);
      const user = await UserService.create(data);
      res.status(200).send({
        data: user,
        message: "Successfully",
      });
    } catch (error) {
      res.status(500).send({
        error: error,
        message: "Server Internal Error",
      });
    }
  }

  async login(req:  CustomRequest<User>, res: Response, next: NextFunction) {
    req.body.password = Helpers.passwordToHash(req.body.password);
    try {
      const data = req.body;
      const user = await UserService.find(data);
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
}

module.exports = new Users();
