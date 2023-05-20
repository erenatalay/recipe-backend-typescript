import { Post } from "./Post";
import { User } from "./User";

export interface WishList {
  user: User;
  post: Post;
  postId: number;
  id: number;
}
