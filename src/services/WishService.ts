import { WishList } from './../entity/WishList';
import BaseService  from "./BaseService";

class WishService extends BaseService {
    constructor(){
        super(WishList)
    }
}

export default new WishService();