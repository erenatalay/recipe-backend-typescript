import { Router } from 'express';
import UsersConstoller  from "../controller/user";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import UserValidation from "../validations/user"
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.put(`/`,authenticate,validate(UserValidation.updateValidation()) ,UsersConstoller.updateUser);
        this.router.delete(`/`,authenticate ,UsersConstoller.deleteUser);
        this.router.post(`/register`,validate(UserValidation.createValidation()) ,UsersConstoller.createUser);
        this.router.post(`/login`,validate(UserValidation.loginValidation()), UsersConstoller.login);
        this.router.get(`/me`,authenticate, UsersConstoller.getUser);
        this.router.put(`/change-password`, validate(UserValidation.changePasswordValidation()),authenticate, UsersConstoller.changePassword);
        this.router.put(`/update-profile-image`,authenticate, UsersConstoller.updateProfileImage);
    }
}
const getRouter = new UserRouter()

export default  getRouter.router;