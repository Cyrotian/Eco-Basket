package com.eco_basket.eco_basket;

import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Models.Notification;
import com.ecoBasket.ecobasket.Repos.NotificationRepo;
import com.ecoBasket.ecobasket.Services.NotificationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {
    @Mock
private NotificationRepo notificationRepo;

@InjectMocks
private NotificationService notificationService;

private Notification sampleNotification;

@BeforeEach
void setUp() {
    // Use Long literals for userId and notificationId
    sampleNotification = new Notification(1L, "EVENT_TYPE", "Test Content");
    sampleNotification.setNotificationId(100L);
}

@Test
void shouldCreateNotificationWithDefaultUnreadStatus() {
    NotificationPostDTO dto = new NotificationPostDTO(1L, "Hello World", "GREETING");

    when(notificationRepo.save(any(Notification.class))).thenAnswer(invocation -> {
        Notification n = invocation.getArgument(0);
        n.setNotificationId(999L);
        return n;
    });

    Notification created = notificationService.createNotification(dto);

    assertNotNull(created);
    assertEquals("UNREAD", created.getStatus());
    assertEquals(dto.getContent(), created.getContent());
    assertEquals(dto.getUserId(), created.getUserId());
    verify(notificationRepo, times(1)).save(any(Notification.class));
}

@Test
void shouldReturnAllNotificationsForUser() {
    when(notificationRepo.findByUserId(1L)).thenReturn(List.of(sampleNotification));

    List<Notification> result = notificationService.getNotifications(1L);

    assertNotNull(result);
    assertEquals(1, result.size());
    assertEquals(1L, result.get(0).getUserId());
}

@Test
void shouldMarkNotificationAsReadIfExists() {
    sampleNotification.setStatus("UNREAD");
    when(notificationRepo.findById(100L)).thenReturn(Optional.of(sampleNotification));

    notificationService.markAsRead(100L);

    assertEquals("READ", sampleNotification.getStatus());
    verify(notificationRepo).save(sampleNotification);
}

@Test
void shouldDoNothingIfNotificationToMarkAsReadNotFound() {
    when(notificationRepo.findById(999L)).thenReturn(Optional.empty());

    notificationService.markAsRead(999L);

    verify(notificationRepo, never()).save(any());
}

@Test
void shouldDeleteNotificationById() {
    Long id = 1L;
    notificationService.deleteNotification(id);
    verify(notificationRepo, times(1)).deleteById(id);
}

@Test
void shouldReturnOnlyUnreadNotifications() {
    Notification read = new Notification(1L, "event", "read");
    read.setStatus("READ");
    Notification unread = new Notification(1L, "event", "unread");
    unread.setStatus("UNREAD");

    when(notificationRepo.findByUserId(1L)).thenReturn(List.of(read, unread));

    List<Notification> result = notificationService.findUnreadNotifications(1L);

    assertEquals(1, result.size());
    assertEquals("UNREAD", result.get(0).getStatus());
}

@Test
void shouldUpdateNotificationStatus() {
    when(notificationRepo.findById(100L)).thenReturn(Optional.of(sampleNotification));
    when(notificationRepo.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Notification updated = notificationService.updateNotificationStatus(100L, "UNREAD");

    assertNotNull(updated);
    assertEquals("UNREAD", updated.getStatus());
    verify(notificationRepo).save(sampleNotification);
}

@Test
void shouldThrowWhenUpdatingNonExistentNotification() {
    when(notificationRepo.findById(999L)).thenReturn(Optional.empty());

    assertThrows(RuntimeException.class, () -> {
        notificationService.updateNotificationStatus(999L, "READ");
    });
}

@Test
void shouldMarkAllNotificationsAsReadForUser() {
    Notification n1 = new Notification(1L, "event1", "content1");
    Notification n2 = new Notification(1L, "event2", "content2");
    n1.setNotificationId(1L);
    n2.setNotificationId(2L);
    n1.setStatus("UNREAD");
    n2.setStatus("UNREAD");

    List<Notification> notifications = List.of(n1, n2);
    when(notificationRepo.findByUserId(1L)).thenReturn(notifications);
    when(notificationRepo.saveAll(anyList())).thenReturn(notifications);

    List<Notification> updated = notificationService.markAllAsRead(1L);

    assertEquals(2, updated.size());
    assertTrue(updated.stream().allMatch(n -> "READ".equals(n.getStatus())));
    verify(notificationRepo).saveAll(anyList());
}

}
