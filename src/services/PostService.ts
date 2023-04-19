import { Post } from './../entity/Posts';
import BaseService  from "./BaseService";

class PostController extends BaseService {
    constructor(){
        super(Post)
    }
}

export default new PostController();