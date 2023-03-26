import { Router, } from 'express';
const UsersConstoller = require("../controller/user");
const authenticate = require("../middlewares/authenticate");
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`, UsersConstoller.getUser);
        this.router.post(`/`, UsersConstoller.createUser);
        this.router.post(`/login`, UsersConstoller.login);
        this.router.get(`/me`,authenticate, UsersConstoller.getUser);
    }
}
const getRouter = new UserRouter()

module.exports = getRouter.router;