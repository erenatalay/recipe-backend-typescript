import { Category } from './../entity/Category';
import BaseService  from "./BaseService";

class CategoryService extends BaseService {
    constructor(){
        super(Category)
    }
}

export default new CategoryService();