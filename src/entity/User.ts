import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum Gender {
    Man = "man",
    Women = "women"
}

export enum Status {
    On = "on",
    Off = "off"
}
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column()
    profile_image: string;

    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;
    
    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;

    @Column()
    activation_code: string;
    
}
