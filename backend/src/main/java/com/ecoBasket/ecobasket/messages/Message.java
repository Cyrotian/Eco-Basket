package com.ecoBasket.ecobasket.messages;

import java.sql.Timestamp;

public class Message {
    private Long messageId;  // Unique ID for the message
    private Long senderId;   // ID of the sender
    private Long recipientId; // ID of the recipient
    private String messageBody; // The actual message content
    private Timestamp timestamp; // Time when message was sent

    // Constructor
    public Message(Long messageId, Long senderId, Long recipientId, String messageBody, Timestamp timestamp) {
        this.messageId = messageId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.messageBody = messageBody;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
