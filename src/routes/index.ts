import { Router, } from 'express';
const UserRouter = require("./user");

class MainRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.use(`/user`, UserRouter);
    }
}
const getRouter = new MainRouter()
module.exports = getRouter.router