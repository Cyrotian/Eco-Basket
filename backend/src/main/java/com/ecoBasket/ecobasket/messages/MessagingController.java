package com.ecoBasket.ecobasket.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React's dev server
public class MessagingController {

    @Autowired
    private MessagingService messagingService;

    // Send a message
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long recipientId,
            @RequestParam String messageBody
    ) {
        messagingService.sendMessage(senderId, recipientId, messageBody);
        return ResponseEntity.ok("Message sent successfully");
    }

    // Get messages between two users
    @GetMapping("/{userId1}/{userId2}")
    public List<Message> getMessagesBetweenUsers(@PathVariable Long userId1, @PathVariable Long userId2) {
        return messagingService.getMessagesBetweenUsers(userId1, userId2);
    }

    // Get inbox for a specific user
    @GetMapping("/inbox/{userId}")
    public List<Message> getUserInbox(@PathVariable Long userId) {
        return messagingService.getUserInbox(userId);
    }
}
