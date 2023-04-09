import { CustomRequest } from '../request/CustomRequest';
import { Request, Response, NextFunction } from "express";
import { CustomAuthRequest } from "../request/CustomAuthRequest";
import { User } from "../model/User";
export interface UserController {
    getUser : (req: CustomAuthRequest<User>,res: Response,next: NextFunction) => void
    createUser : (req: CustomRequest<User>,res: Response,next: NextFunction) => void
    login : (req: CustomRequest<User>,res: Response,next: NextFunction) => void
    updateUser : (req: CustomAuthRequest<User>,res: Response,next: NextFunction) => void
    deleteUser : (req: CustomAuthRequest<User>,res: Response,next: NextFunction) => void
    changePassword : (req: CustomAuthRequest<User>,res: Response,next: NextFunction) => void
    updateProfileImage : (req: CustomAuthRequest<User>,res: Response,next: NextFunction) => void
    
}