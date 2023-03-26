import { Router, } from 'express';
const UsersConstoller = require("../controller/user");
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`, UsersConstoller.getUser);
        this.router.post(`/`, UsersConstoller.createUser);
        this.router.post(`/login`, UsersConstoller.login);
    }
}
const getRouter = new UserRouter()

module.exports = getRouter.router;