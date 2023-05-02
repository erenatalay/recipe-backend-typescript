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
        this.router.put(`/:id`,authenticate, PostController.updatePost);
        this.router.delete(`/:id`,authenticate, PostController.deletePost);
    }
}
const getRouter = new PostRouter()

export default  getRouter.router;