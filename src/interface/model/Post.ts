import { Category } from "./Category";
import { PostPhoto } from "./PostPhoto";
import { User } from "./User";

export interface Post {
    id : number;
    name : string;
    description : string;
    video : string;
    user : User;
    category : Category;
    photos : PostPhoto;
    photoId : number[];
    categoryId : number[];
} 