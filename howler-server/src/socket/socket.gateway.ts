import { SubscribeMessage, MessageBody, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketController{
    
    @WebSocketServer() server : Server

    @SubscribeMessage('chat message')
    handleChatMessage(
        @MessageBody() data: string): void {
            this.server.emit('chat message', data);
    }
}
