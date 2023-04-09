import { Request } from "express";
import { User } from "../model/User";
export interface CustomAuthRequest<T> extends Request {
  body: T;
  user? : User
}
