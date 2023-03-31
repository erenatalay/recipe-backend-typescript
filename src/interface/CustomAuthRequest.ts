import { Request } from "express";
import { User } from "../entity/User";
export interface CustomAuthRequest<T> extends Request {
  body: T;
  user? : User
}
