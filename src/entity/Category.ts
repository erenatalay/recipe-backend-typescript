import {Entity, PrimaryGeneratedColumn,Column,ManyToOne, ManyToMany} from "typeorm";
import { Post } from "./Posts"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Post, post => post.categories)
    posts: Post[];
}
