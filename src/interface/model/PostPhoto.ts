import { Post } from "./Post";

export interface PostPhoto {
    id : number;
    image : string
    postId : number
    post : Post[]
}