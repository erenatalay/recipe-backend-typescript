import { Request } from "express";
import { User } from "../entity/User";
export interface CustomRequest<T> extends Request {
  body: T;
}
