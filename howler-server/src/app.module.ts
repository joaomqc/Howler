import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { SocketController } from './socket/socket.gateway';
import { UserModule } from './user/user.module';
import * as ormData from '../ormconfig.json';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Conversation } from './entity/conversation.entity';
import { Message } from './entity/message.entity';
import { Participant } from './entity/participant.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: ormData.host,
            port: ormData.port,
            username: ormData.username,
            password: ormData.password,
            database: ormData.database,
            entities: [
                Conversation,
                Message,
                Participant,
                User
            ]
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UserModule,
        AuthModule
    ],
    controllers: [UserController],
    providers: [SocketController]
})
export class AppModule {}
