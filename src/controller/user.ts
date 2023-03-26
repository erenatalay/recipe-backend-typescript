import { Request, Response, NextFunction } from "express";
const UserService = require("../services/UserService");
const { generateAccessToken, generateRefreshToken,passwordToHash } = require("../utils/helper");
class Users {
  async getUser(req: any, res: Response, next: NextFunction) {
  try {
    const id = req.user.id
    const user = await UserService.find({id});
    res.status(200).json({
        success: true,
        data: user
    })
  } catch (error) {
    res.status(500).send({
      message: "Server Internal Error",
    });
  }
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      req.body.password = passwordToHash(req.body.password);
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

  async login(req: Request, res: Response, next: NextFunction) {
    req.body.password = passwordToHash(req.body.password)
    try {
      const data = req.body;
      const user = await UserService.find(data);
      const response = {
        ...user,
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user)
      }
      }
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
