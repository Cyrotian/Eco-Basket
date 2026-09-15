import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";

console.log("ChatBubble:", ChatBubble);
console.log("MessageInput:", MessageInput);

const MessagingSystem = () => {
    const [messages, setMessages] = useState([]); // Store messages
    const [userId] = useState(1); // Temporary user ID for testing
    const [recipientId] = useState(2); // Temporary recipient ID

    useEffect(() => {
        // Fetch messages from backend
        axios.get(`http://localhost:8080/api/messages/${userId}/${recipientId}`)
            .then(response => setMessages(response.data))
            .catch(error => console.error("Error fetching messages:", error));

        // Set up WebSocket connection
        const socket = new WebSocket("ws://localhost:8080/ws");

        // Handle incoming messages
        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data); // Assuming backend sends JSON
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        // Clean up WebSocket connection on unmount
        return () => {
            socket.close();
        };
    }, [userId, recipientId]);

    // Function to send a message
    const sendMessage = (messageBody) => {
        axios.post(`http://localhost:8080/api/messages/send`, null, {
            params: {
                senderId: userId,
                recipientId: recipientId,
                messageBody: messageBody,
            }
        })
        .then(() => {
            setMessages([...messages, { senderId: userId, messageBody }]); // Update UI instantly
        })
        .catch(error => console.error("Error sending message:", error));
    };

    return (
        <div className="chat-container">
            <div className="messages-list">
                {messages.map((msg, index) => (
                    <ChatBubble key={index} message={msg} userId={userId} />
                ))}
            </div>
            <MessageInput onSendMessage={sendMessage} />
        </div>
    );
};

export default MessagingSystem;