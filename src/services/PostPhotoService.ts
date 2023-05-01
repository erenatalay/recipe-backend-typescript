import { PostPhoto } from './../entity/PostPhoto';
import BaseService from './BaseService';

class PostPhotoController extends BaseService {
    constructor(){
        super(PostPhoto)
    }
}

export default new PostPhotoController();