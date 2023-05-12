import {Entity, PrimaryGeneratedColumn,Column,ManyToOne, ManyToMany} from "typeorm";
import { Post } from "./Posts"
import { User } from "./User"

@Entity()
export class WishList {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.wishList,{onDelete : "CASCADE",onUpdate : "CASCADE"})
    post: Post;

    @ManyToOne(() => User)
    user: User;
}
