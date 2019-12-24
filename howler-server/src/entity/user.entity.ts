import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() userId: number

    @Column({ length: 16, type: 'varchar' })
    username: string

    @Column({ length: 256, type: 'varchar' })
    email: string

    @Column({ length: 256, type: 'varchar', select: false })
    password: string
}