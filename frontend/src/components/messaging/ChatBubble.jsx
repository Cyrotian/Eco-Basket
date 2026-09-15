import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./ChatBubble.css"; // Ensure CSS is imported

const ChatBubble = ({ message, userId }) => {
    const isSent = message.senderId === userId; // Check if the message was sent by the current user

    return (
        <div className={`chat-bubble ${isSent ? "sent" : "received"}`}>
            <p className="bubble-text">{message.messageBody}</p>
        </div>
    );
};

// Add PropTypes validation
ChatBubble.propTypes = {
    message: PropTypes.shape({
        senderId: PropTypes.number.isRequired,
        messageBody: PropTypes.string.isRequired
    }).isRequired,
    userId: PropTypes.number.isRequired
};

export default ChatBubble;
