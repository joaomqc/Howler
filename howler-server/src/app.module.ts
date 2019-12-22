import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { SocketController } from './controller/socket.gateway';
import UserRepository from './repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, SocketController],
})
export class AppModule {}
