import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { SocketController } from './controller/socket.gateway';
import { UserModule } from './user/user.module';
import * as ormData from '../ormconfig.json';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: ormData.host,
    port: ormData.port,
    username: ormData.username,
    password: ormData.password,
    database: ormData.database,
    entities: [User]
  }), UserModule],
  controllers: [UserController],
  providers: [SocketController],
})
export class AppModule {}
