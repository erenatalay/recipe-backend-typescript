import { Router } from 'express';
import CategoryController  from "../controller/category";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
import CategoryValidation from "../validations/category"

class CategoryRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, CategoryController.getCategory);
        this.router.post(`/`,authenticate,validate(CategoryValidation.createValidation()), CategoryController.createCategory);
    }
}
const getRouter = new CategoryRouter()

export default  getRouter.router;