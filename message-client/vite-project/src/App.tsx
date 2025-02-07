import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const App = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const socketIO = io('http://localhost:3010');

        setSocket(socketIO);

        socketIO?.on('connect', () => {
            console.log('Connected to server');
        });

        socketIO?.on('receive', (data: string) => {
            setMessages((pre) => [...pre, data]);
        });

        return () => {
            socketIO?.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket?.emit('send', inputRef.current?.value);
    };

    return (
        <div>
            <div className="">
                <ul>
                    {messages.map((msg) => (
                        <li className="">{msg}</li>
                    ))}
                </ul>
                <div className="">
                    <input type="text" ref={inputRef} />
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    );
};

export default App;
