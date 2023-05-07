import { Router } from 'express';
import PostController  from "../controller/post";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
import PostValidation from "../validations/post"
import { idChecker } from '../middlewares/idCheck';
class PostRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, PostController.getPosts);
        this.router.get(`/:id`,authenticate,idChecker(), PostController.findPost);
        this.router.post(`/`,authenticate,validate(PostValidation.createValidation()), PostController.createPost);
        this.router.put(`/:id`,authenticate,idChecker(),validate(PostValidation.updateValidation()), PostController.updatePost);
        this.router.delete(`/:id`,authenticate,idChecker(), PostController.deletePost);
    }
}
const getRouter = new PostRouter()

export default  getRouter.router;