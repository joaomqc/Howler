import socketIOClient from 'socket.io-client';

export default class SocketRepository {

    private static readonly endpoint = 'http://localhost:4200';

    private static socket: SocketIOClient.Socket;

    private static getSocket = () => {
        if(!SocketRepository.socket){
            SocketRepository.socket = socketIOClient(SocketRepository.endpoint);
        }
        return SocketRepository.socket;
    }

    public static subscribe = (eventName: string, eventHandler: Function) => {
        SocketRepository.getSocket().on(eventName, eventHandler);
    }

    public static unsubscribe = (eventName: string, eventHandler: Function) => {
        SocketRepository.getSocket().off(eventName, eventHandler);
    }

    public static unsubscribeAll = (eventName: string) => {
        SocketRepository.getSocket().off(eventName);
    }

    public static emit = (eventName: string, ...args: any[]) => {
        SocketRepository.getSocket().emit(eventName, args);
    }
}