import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../componentCss/Chat.css';
import { userName } from './Home';
import Message from './Message';
import socketIo from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
let socket;

const serverURL = "http://localhost:5000";

const Chat = () => {
    const [id, setId] = useState("")
    const [messages, setMessages] = useState([]);

    const handleClick = () => {
        const msgData = document.getElementById("msgInput").value;
        socket.emit('sendMessage', { message: msgData, id: socket.id })
        document.getElementById("msgInput").value = "";
    }
    const enterToSend = e => {
        if (e.key === 'Enter') handleClick();
        else return;
    }

    useEffect(() => {
        socket = socketIo(serverURL, { transports: ['websocket'] });
        socket.on("connect", () => {
            setId(socket.id);
        })
        socket.emit("entered", ({ userName }))

        socket.on('greet', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('userEntered', (data) => {
            setMessages([...messages, data]);
        })

        socket.on('leftchat', (data) => {
            setMessages([...messages, data.message]);;
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on('send', (data) => {
            setMessages([...messages, data]);
        })
        return () => {
            socket.off();

        }
    }, [messages])


    return (
        <div className="chat">
            <div className=" chat_container ">
                <div className="chat_header text-center">Welcome to the Chat Room, {userName}!</div>
                <ScrollToBottom className="container message_box">
                    {messages.map((data, i) => <Message key={i} user={data.id === id ? '' : data.user} message={data.message} classNames={data.id === id ? 'sent_message' : 'received_message'} />)}
                </ScrollToBottom>
                <div className="message_input">
                    <input type="text" onKeyPress={enterToSend} placeholder='Message' id='msgInput' />
                    <button onClick={handleClick} className="send_btn mx-2 btn-danger" id="sendBtn"><SendIcon /> </button>
                </div>
            </div>+
        </div>
    )
}

export default Chat;
