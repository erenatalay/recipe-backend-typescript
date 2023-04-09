import { Router } from 'express';
import CategoryController  from "../controller/category";
import authenticate  from "../middlewares/authenticate";
class CategoryRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, CategoryController.getCategory);
    }
}
const getRouter = new CategoryRouter()

export default  getRouter.router;