import {Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable} from "typeorm";
import { User } from "./User"
import { Category } from "./Category"
import { PostPhoto } from "./PostPhoto";
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({ type: "int", nullable: true })
    userId: number;
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
    @Column({ type: "int", nullable: true })
    categoryId: number;
    @ManyToMany(() => Category, category => category.posts)
    @JoinTable()
    categories: Category[];
    @OneToMany(() => PostPhoto, photo => photo.post)
    photos: PostPhoto[];
}
