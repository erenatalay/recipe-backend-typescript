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

    @Column({
        select :false
    })
    password: string;
    
    @Column({
        nullable : true
    })
    profile_image: string;

    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;
    
    @Column({
        type: "enum",
        enum: Status,
        default : "off"
    })
    status: Status;

    @Column({
        nullable : true,
        select :false
    })
    activation_code: string;
    
}
