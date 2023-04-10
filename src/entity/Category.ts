import {Entity, PrimaryGeneratedColumn,Column} from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
