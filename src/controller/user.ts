import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

class Users {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = userRepository.find();
    res.status(200).send({
      data: user,
      message: "Successfully",
    });
  }
}
module.exports = new Users();
