import React from 'react';
import socketIOClient from 'socket.io-client';

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            selectedChatGroup: "General",
            userId: Math.random(),
            message: "",
            socket: undefined,
            chats: [{
                chatGroup: "General",
                messages: []
            }],
            newGroup: ''
        };
    }

    componentDidMount(){
        const endpoint = "http://localhost:4200";
        const socket = socketIOClient(endpoint);
        
        socket.on('chat message', (message) => {
            this.setState({
                chats: this.state.chats.map(chat => {
                    if(chat.chatGroup !== message.chatGroup){
                        return chat;
                    }
                    return {
                        chatGroup: chat.chatGroup,
                        messages: [...chat.messages, {
                            userId: message.userId,
                            text: message.text
                        }]
                    }})
            });
        });

        this.setState({
            socket
        });
    }

    onSend = () => {
        this.state.socket.emit('chat message', {
            chatGroup: this.state.selectedChatGroup,
            userId: this.state.userId,
            text: this.state.message
        });

        this.setState({
            message: ''
        });
    }

    onAddGroup = () => {
        this.setState({
            newGroup: '',
            chats: [...this.state.chats, {
                chatGroup: this.state.newGroup,
                messages: []
            }]
        })
    }

    handleKeyDown = (evt, action) => {
        if(evt.key === 'Enter') {
            action();
        }
    }

    render() {
        const selectedChat = this.state.chats.find(chat => chat.chatGroup === this.state.selectedChatGroup);

        return (
            <div className="app w-full">
                <div className="flex w-full">
                    <div className="relative chat-groups-bar w-1/4 h-full">
                        {this.state.chats.map(chat =>
                            <div
                                key={chat.chatGroup}
                                className={`chat-group py-3 w-full cursor-pointer select-none ${chat.chatGroup === this.state.selectedChatGroup && 'chat-group--active'}`}
                                onClick={() => this.setState({selectedChatGroup: chat.chatGroup, message: ''})}>
                                <div className="ml-6">
                                    {chat.chatGroup}
                                </div>
                            </div>
                        )}
                        <footer className="absolute bottom-0 h-12 inset-x-0">
                            <input className="w-3/4" value={this.state.newGroup} onChange={evt => this.setState({newGroup: evt.target.value})} onKeyDown={(evt) => this.handleKeyDown(evt, this.onAddGroup)} />
                            <button className="w-1/4" onClick={this.onAddGroup}>Add</button>
                        </footer>
                    </div>
                    <div className="relative chat-window w-3/4 h-full">
                        <div className="">
                            {selectedChat && selectedChat.messages.map(message =>
                                <div key={message.text} className={`px-6 py-3 w-full ${message.userId === this.state.userId && "text-right"}`}>
                                    {message.text}
                                </div>
                            )}
                        </div>
                        <footer className="absolute bottom-0 h-12 inset-x-0">
                            <input className="w-3/4" value={this.state.message} onChange={evt => this.setState({message: evt.target.value})} onKeyDown={(evt) => this.handleKeyDown(evt, this.onSend)} />
                            <button className="w-1/4" onClick={this.onSend}>Send</button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;
