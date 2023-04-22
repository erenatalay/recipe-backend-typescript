import {Entity, PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
import { Post } from "./Posts"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => Post, post => post.categoryId)
    post: Post;
}
