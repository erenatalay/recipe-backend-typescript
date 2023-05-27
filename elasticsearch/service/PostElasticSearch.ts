import { Post } from './../../src/interface/model/Post';
import client from "../index";

class PostElasticSearch {
    createIndex = async (request : Post) => {
       
        try {
           await client.index({
                index: "recipe",
                id: String(request.id),
                body: request,
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export default new PostElasticSearch();