import { Request, Response, NextFunction } from "express";
const UserService = require("../services/UserService")

class Users {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const user = UserService.list();
    res.status(200).send({
      data: user,
      message: "Successfully",
    });
  }
}
module.exports = new Users();
