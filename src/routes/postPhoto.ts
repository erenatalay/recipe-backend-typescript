import { Router } from 'express';
import PostPhotosController  from "../controller/postPhoto";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
import PostValidation from "../validations/post"
import { idChecker } from '../middlewares/idCheck';
class PostPhotosRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        // this.router.get(`/`,authenticate, PostPhotosController.getPosts);
        // this.router.get(`/:id`,authenticate,idChecker(), PostPhotosController.findPost);
        this.router.post(`/`,authenticate, PostPhotosController.createPostPhotos);
        // this.router.put(`/:id`,authenticate,idChecker(),validate(PostValidation.updateValidation()), PostPhotosController.updatePost);
        // this.router.delete(`/:id`,authenticate,idChecker(), PostPhotosController.deletePost);
    }
}
const getRouter = new PostPhotosRouter()

export default  getRouter.router;