import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn() messageId: number

    @Column()
    conversationId: number

    @Column()
    senderId: number

    @Column({ length: 256, type: 'varchar' })
    message: string

    @Column({type: 'date'})
    createdAt: Date
}