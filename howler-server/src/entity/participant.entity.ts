import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn() participantId: number

    @Column()
    userId: number

    @Column()
    conversationId: number
}