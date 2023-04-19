import { Router } from 'express';
import PostController  from "../controller/post";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
class PostRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, PostController.getPosts);
        // this.router.get(`/:id`,authenticate,idChecker(), CategoryController.findCategory);
        this.router.post(`/`,authenticate, PostController.createPost);
        // this.router.put(`/:id`,authenticate,idChecker(),validate(CategoryValidation.createValidation()), CategoryController.updateCategory);
        // this.router.delete(`/:id`,authenticate,idChecker(), CategoryController.deleteCategory);
    }
}
const getRouter = new PostRouter()

export default  getRouter.router;