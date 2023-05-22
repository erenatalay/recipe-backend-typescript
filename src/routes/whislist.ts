import { Router } from 'express';
import WishListController  from "../controller/whislist";
import authenticate  from "../middlewares/authenticate";
import { idChecker } from '../middlewares/idCheck';
import validate from '../middlewares/validate';
import WishListValidation from "../validations/wishlist"
class WhisListRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`/`,authenticate, WishListController.getWhislist);
        this.router.get(`/:id`,authenticate,idChecker(), WishListController.findWhislist);
        this.router.post(`/`,authenticate,validate(WishListValidation.createValidation()), WishListController.createWhislist);
        this.router.delete(`/:id`,authenticate,idChecker(), WishListController.deleteWhislist);
    }
}
const getRouter = new WhisListRouter()

export default  getRouter.router;