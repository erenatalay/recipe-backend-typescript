import { Request, Response, NextFunction, Errback } from "express";
import { CustomError as CustomErrorType } from "../interface/error/CustomError";
import CustomError from "../utils/CustomError";
import { UniqueText } from "../utils/UniqueText";
import { TypeOrmError } from "../interface/error/TypeORMError";
import ThrowLogger from "../utils/ThrowLogger";
import logger from "../logger/error";

export default (
  error: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ThrowLogger(`date : ${new Date()}, path : ${req?.path}, status : ${error?.status}, message : ${error?.message}`, logger);

  const uniqueError = error as unknown as TypeOrmError;
  if (uniqueError?.driverError?.code === "23505") {
    return next(
      new CustomError(UniqueText(uniqueError.driverError.detail), 400)
    );
  }
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Internal Server Error.",
    },
  });
};
