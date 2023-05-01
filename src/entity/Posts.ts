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
    @Column({nullable : true})
    description: string;
    @Column({nullable : true})
    video: string;
    @ManyToOne(() => User)
    user: User;
    @ManyToMany(() => Category, category => category.posts,{ cascade: true })
    @JoinTable()
    categories: Category[];
    @OneToMany(() => PostPhoto, photo => photo.post,{ cascade: true })
    photos: PostPhoto[];
}
