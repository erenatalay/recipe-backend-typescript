import {Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable} from "typeorm";
import { User } from "./User"
import { Category } from "./Category"
import { Post } from "./Posts";
@Entity()
export class PostPhoto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    image: string;
    @ManyToOne(() => Post, post => post.photos)
    post: Post;
}
