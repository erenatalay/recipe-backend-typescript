import { Router } from 'express';
const UsersConstoller = require("../controller/user");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user")
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

module.exports = getRouter.router;