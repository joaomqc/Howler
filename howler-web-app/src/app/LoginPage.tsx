import React, { useState } from 'react';
import UserRepository from 'infrastructure/auth.repository';
import { useHistory } from 'react-router';

const ChatPage: React.FC = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        if(UserRepository.logUserIn(username, password)){
           history.push('/');
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-200 flex items-center">
            <div className="w-full max-w-xs m-auto">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)} />
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={onLogin}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;