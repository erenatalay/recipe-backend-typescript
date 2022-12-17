import { Router, } from 'express';
const UsersConstoller = require("../controller/user");
class UserRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`, UsersConstoller.getUser);
    }
}
const getRouter = new UserRouter()

module.exports = getRouter.router;