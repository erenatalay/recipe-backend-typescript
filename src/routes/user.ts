import { Router } from 'express';
import UsersConstoller  from "../controller/user";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import userValidation from "../validations/user"
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.put(`/`,authenticate,validate(userValidation.updateValidation()) ,UsersConstoller.updateUser);
        this.router.delete(`/`,authenticate ,UsersConstoller.deleteUser);
        this.router.post(`/register`,validate(userValidation.createValidation()) ,UsersConstoller.createUser);
        this.router.post(`/login`,validate(userValidation.loginValidation()), UsersConstoller.login);
        this.router.get(`/me`,authenticate, UsersConstoller.getUser);
    }
}
const getRouter = new UserRouter()

export default  getRouter.router;