import { Router } from 'express';
import PostPhotosController  from "../controller/postPhoto";
import authenticate  from "../middlewares/authenticate";
import validate from '../middlewares/validate';
import PostPhotoValidation from "../validations/postPhoto"
import { idChecker } from '../middlewares/idCheck';
class PostPhotosRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        // this.router.get(`/`,authenticate, PostPhotosController.getPosts);
        this.router.get(`/:postId`,authenticate, PostPhotosController.getPostPhotos);
        this.router.post(`/`,authenticate,PostPhotosController.createPostPhotos);
        this.router.put(`/:id`,authenticate,idChecker(), PostPhotosController.updatePostPhotos);
        // this.router.delete(`/:id`,authenticate,idChecker(), PostPhotosController.deletePost);
    }
}
const getRouter = new PostPhotosRouter()

export default  getRouter.router;