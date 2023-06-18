import { Router } from 'express';
import SearchController  from "../controller/search";
import authenticate  from "../middlewares/authenticate";
import validate  from"../middlewares/validate" ;
import UserValidation from "../validations/user"
class SearchRouter {
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
 
        this.router.get(`/`,authenticate, SearchController.search);
    }
}
const getRouter = new SearchRouter()

export default  getRouter.router;