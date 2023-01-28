import { Request, Response, NextFunction } from "express";
class Users {

  getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    res.status(200).send({
      data: { id: 1, name: "Eren", surname: "Atalay" },
      message: "Successfully",
    });
  };
}

module.exports = new Users();
