import { Router } from 'express';
import WishListController  from "../controller/whislist";
import authenticate  from "../middlewares/authenticate";
class WhisListRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, WishListController.getWhislist);
        // this.router.get(`/:id`,authenticate,idChecker(), PostController.findPost);
        this.router.post(`/`,authenticate, WishListController.createWhislist);
        this.router.delete(`/:id`,authenticate, WishListController.deleteWhislist);
    }
}
const getRouter = new WhisListRouter()

export default  getRouter.router;