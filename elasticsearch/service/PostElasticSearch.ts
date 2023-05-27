import { Post } from "./../../src/interface/model/Post";
import client from "../index";

class PostElasticSearch {
  createIndex = async (request: Post) => {
    try {
      await client.index({
        index: "recipe",
        id: String(request.id),
        body: request,
      });
    } catch (err) {
      console.log(err);
    }
  };
  updateIndex = async (request: Post) => {
    try {
      await client.update({
        index: "recipe",
        id: String(request.id),
        body: {
          doc: request,
          doc_as_upsert: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  deleteIndex = async (request: Post) => {
    try {
      await client.delete({
        index: "recipe",
        id: String(55),
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default new PostElasticSearch();
