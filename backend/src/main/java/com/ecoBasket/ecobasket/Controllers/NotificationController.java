package com.ecoBasket.ecobasket.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Models.Notification;
import com.ecoBasket.ecobasket.Services.NotificationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/notification")

public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Create a new notification
    @PostMapping
    public Notification create(@RequestBody NotificationPostDTO notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }

    // Get all notifications for a user
    @GetMapping
    public List<Notification> getNotifications(@RequestParam("userId") long userId) {
        return notificationService.getNotifications(userId);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Notification> markNotificationStatus(
        @PathVariable int notificationId,
        @RequestBody Map<String, String> requestBody
    ) {
        String status = requestBody.get("status");
        Notification updated = notificationService.updateNotificationStatus(notificationId, status);
        return ResponseEntity.ok(updated);
    }

    // Mark all notifications as read for a user
    @PutMapping("/markAllRead")
    public ResponseEntity<List<Notification>> markAllRead(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        List<Notification> updatedNotifications = notificationService.markAllAsRead(userId);
        return ResponseEntity.ok(updatedNotifications);
    }
}
