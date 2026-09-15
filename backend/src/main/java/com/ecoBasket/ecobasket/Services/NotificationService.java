package com.ecoBasket.ecobasket.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Models.Notification;
import com.ecoBasket.ecobasket.Repos.NotificationRepo;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepo notificationRepo;

    // Create Notification using DTO (status is defaulted to "UNREAD")
    public Notification createNotification(NotificationPostDTO dto) {
        Notification notification = new Notification(dto.getUserId(), dto.getEventType(), dto.getContent());
        return notificationRepo.save(notification);
    }

    public List<Notification> getNotifications(long userId) {
        return notificationRepo.findByUserId(userId);
    }

    public void markAsRead(long notificationId) {
        Notification notification = notificationRepo.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setStatus("READ");
            notificationRepo.save(notification);
        }
    }

    public void deleteNotification(long notificationId) {
        notificationRepo.deleteById(notificationId);
    }
    
    public List<Notification> findUnreadNotifications(long userId) {
        return notificationRepo.findByUserId(userId).stream()
            .filter(notification -> notification.getStatus().equals("UNREAD"))
        
            .collect(Collectors.toList());
    }

    public Notification updateNotificationStatus(long notificationId, String status) {
        Notification notification = notificationRepo.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setStatus(status);
        return notificationRepo.save(notification);
    }    

    public List<Notification> markAllAsRead(Long userId) {
        List<Notification> userNotifications = notificationRepo.findByUserId(userId);
        for (Notification n : userNotifications) {
            n.setStatus("READ");
        }
        return notificationRepo.saveAll(userNotifications);
    }
}
