import {Entity, PrimaryGeneratedColumn,Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { User } from "./User"
import { Category } from "./Category"
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({ type: "int", nullable: true })
    userId: number;
    @ManyToOne(type => User)
    @JoinColumn({ name: "userId" })
    user: User;
    @Column({ type: "int", nullable: true })
    categoryId: number;
    @ManyToOne(type => Category)
    @JoinColumn({ name: "categoryId" })
    category: Category;
}
