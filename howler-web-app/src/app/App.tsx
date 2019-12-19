import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

interface NewMessage {
    chatName: string;
    userId: number;
    text: string;
}

interface Message {
    userId: number;
    text: string;
}

interface Chat {
    chatName: string;
    messages: Message[];
}

const App: React.FC = () => {

    const endpoint = 'http://localhost:4200';

    const [userId] = useState(Math.random());

    const [socket] = useState(socketIOClient(endpoint));
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState<Chat[]>([{
        chatName: 'General',
        messages: []
    }]);
    const [selectedChatName, setSelectedChatName] = useState('General');
    const [newChat, setNewChat] = useState('');

    useEffect(() => {
        socket.on('chat message', (message: NewMessage) => {
            setChats(currentChats =>
                currentChats.map((chat: Chat) => {
                    if(chat.chatName !== message.chatName){
                        return chat;
                    }
                    return {
                        chatName: chat.chatName,
                        messages: [...chat.messages, {
                            userId: message.userId,
                            text: message.text
                        }]
                    };
                }));
        });
    }, [socket]);

    const onSend = () => {
        const newMessage: NewMessage = {
            chatName: selectedChat.chatName,
            userId: userId,
            text: message
        };
        
        socket.emit('chat message', newMessage);

        setMessage('');
    }

    const onAddChat = () => {
        setNewChat('');
        setChats([...chats, {
            chatName: newChat,
            messages: []
        }]);
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, action: Function) => {
        if(evt.key === 'Enter'){
            action();
        }
    }

    const selectedChat: Chat = chats.find(chat => chat.chatName === selectedChatName) || chats[0];

    return (
        <div className="app w-full">
            <div className="flex w-full">
                <div className="relative chat-groups-bar w-1/4 h-full">
                    {chats.map(chat =>
                        <div
                            key={chat.chatName}
                            className={`chat-group py-3 w-full cursor-pointer select-none ${chat.chatName === selectedChat.chatName && 'chat-group--active'}`}
                            onClick={() => {
                                setSelectedChatName(chat.chatName);
                                setMessage('');
                            }}>
                            <div className="ml-6">
                                {chat.chatName}
                            </div>
                        </div>
                    )}
                    <footer className="absolute bottom-0 h-12 inset-x-0">
                        <input className="w-3/4" value={newChat} onChange={evt => setNewChat(evt.target.value)} onKeyDown={(evt) => handleKeyDown(evt, onAddChat)} />
                        <button className="w-1/4" onClick={onAddChat}>Add</button>
                    </footer>
                </div>
                <div className="relative chat-window w-3/4 h-full">
                    <div className="">
                        {selectedChat && selectedChat.messages.map((message: Message) =>
                            <div key={message.text} className={`px-6 py-3 w-full ${message.userId === userId && "text-right"}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                    <footer className="absolute bottom-0 h-12 inset-x-0">
                        <input className="w-3/4" value={message} onChange={evt => setMessage(evt.target.value)} onKeyDown={(evt) => handleKeyDown(evt, onSend)} />
                        <button className="w-1/4" onClick={onSend}>Send</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default App;
