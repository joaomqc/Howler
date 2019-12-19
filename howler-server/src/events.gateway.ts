import { SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class EventsController{
    
    @WebSocketServer() server : Server

  @SubscribeMessage('chat message')
  handleChatMessage(
      @MessageBody() data: string): void {
        this.server.emit('chat message', data);
  }
}
