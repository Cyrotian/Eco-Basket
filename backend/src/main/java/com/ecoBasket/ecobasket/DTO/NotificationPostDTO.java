package com.ecoBasket.ecobasket.DTO;

public class NotificationPostDTO {
    private long userId;
    private String content;
    private String eventType;

    // Constructor
    public NotificationPostDTO(long userId, String content, String eventType) {
        this.userId = userId;
        this.content = content;
        this.eventType = eventType;
    }

    // Getters and setters
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
}
