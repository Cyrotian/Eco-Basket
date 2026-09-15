import React, { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const MessageInput = ({ onSendMessage }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() !== "") {
            onSendMessage(input);
            setInput(""); // Clear input box
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

// ✅ Correct PropTypes definition
MessageInput.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
