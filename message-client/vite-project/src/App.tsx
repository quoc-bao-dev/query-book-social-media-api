import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const App = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socketIO = io('http://localhost:3009');

        setSocket(socketIO);

        socket?.on('receive_message', (data: string) => {
            setMessages((pre) => [...pre, data]);
        });

        return () => {
            socket?.disconnect();
        };
    }, []);

    <div className=""></div>;
    return (
        <div>
            <div className="">
                <ul>
                    {messages.map((msg) => (
                        <li className="">{msg}</li>
                    ))}
                </ul>
                <div className="">
                    <input type="text" />
                    <button>send</button>
                </div>
            </div>
        </div>
    );
};

export default App;
