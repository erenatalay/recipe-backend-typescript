import { Router } from 'express';
import CategoryController  from "../controller/category";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
import CategoryValidation from "../validations/category"
import { idChecker } from '../middlewares/idCheck';

class CategoryRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, CategoryController.getCategory);
        this.router.get(`/:id`,authenticate,idChecker(), CategoryController.findCategory);
        this.router.post(`/`,authenticate,validate(CategoryValidation.createValidation()), CategoryController.createCategory);
        this.router.put(`/:id`,authenticate,validate(CategoryValidation.createValidation()), CategoryController.updateCategory);
    }
}
const getRouter = new CategoryRouter()

export default  getRouter.router;