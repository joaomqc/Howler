import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddConversationEntities1578435523882 implements MigrationInterface {
    name = 'AddConversationEntities1578435523882'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "conversation" ("conversationId" SERIAL NOT NULL, "title" character varying(64) NOT NULL, "createdBy" integer NOT NULL, "createdAt" date NOT NULL, CONSTRAINT "PK_03a1f787084f38eabbeb1c8dfcb" PRIMARY KEY ("conversationId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "message" ("messageId" SERIAL NOT NULL, "conversationId" integer NOT NULL, "senderId" integer NOT NULL, "message" character varying(256) NOT NULL, "createdAt" date NOT NULL, CONSTRAINT "PK_b664c8ae63d634326ce5896cecc" PRIMARY KEY ("messageId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "participant" ("participantId" SERIAL NOT NULL, "userId" integer NOT NULL, "conversationId" integer NOT NULL, CONSTRAINT "PK_69ccb90fdd22eb00df80d6cd35d" PRIMARY KEY ("participantId"))`, undefined);

        queryRunner.clearSqlMemory();

        const conversationParticipantForeignKey = new TableForeignKey({
            columnNames: ["createdBy"],
            referencedColumnNames: ["participantId"],
            referencedTableName: "participant",
        });
        await queryRunner.createForeignKey("conversation", conversationParticipantForeignKey);

        const messageConversationForeignKey = new TableForeignKey({
            columnNames: ["conversationId"],
            referencedColumnNames: ["conversationId"],
            referencedTableName: "conversation"
        });

        const messageSenderForeignKey = new TableForeignKey({
            columnNames: ["senderId"],
            referencedColumnNames: ["participantId"],
            referencedTableName: "participant"
        });

        await queryRunner.createForeignKeys("message", [messageConversationForeignKey, messageSenderForeignKey]);

        const participantConversationForeignKey = new TableForeignKey({
            columnNames: ["conversationId"],
            referencedColumnNames: ["conversationId"],
            referencedTableName: "conversation"
        });
        
        const participantUserForeignKey = new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["userId"],
            referencedTableName: "user"
        });

        await queryRunner.createForeignKeys("participant", [participantConversationForeignKey, participantUserForeignKey]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "participant"`, undefined);
        await queryRunner.query(`DROP TABLE "message"`, undefined);
        await queryRunner.query(`DROP TABLE "conversation"`, undefined);
    }

}
