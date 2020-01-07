import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn() conversationId: number
    
    @Column({ length: 64, type: 'varchar' })
    title: string

    @Column()
    createdBy: number

    @Column({type: 'date'})
    createdAt: Date
}