
package com.ecoBasket.ecobasket.messages;

import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessagingService {

    // Temporary list to store messages (Can be replaced with DB later)
    private List<Message> messages = new ArrayList<>();

    // Send a new message
    public void sendMessage(Long senderId, Long recipientId, String messageBody) {
        Message newMessage = new Message(
                (long) (messages.size() + 1), // Auto-generate message ID (Temporary)
                senderId,
                recipientId,
                messageBody,
                new Timestamp(System.currentTimeMillis()) // Current time
        );
        messages.add(newMessage);
    }

    // Retrieve messages between two users
    public List<Message> getMessagesBetweenUsers(Long userId1, Long userId2) {
        return messages.stream()
                .filter(msg -> (msg.getSenderId().equals(userId1) && msg.getRecipientId().equals(userId2)) ||
                               (msg.getSenderId().equals(userId2) && msg.getRecipientId().equals(userId1)))
                .collect(Collectors.toList());
    }

    // Get all messages for a user (Inbox)
    public List<Message> getUserInbox(Long userId) {
        return messages.stream()
                .filter(msg -> msg.getRecipientId().equals(userId))
                .collect(Collectors.toList());
    }
}
