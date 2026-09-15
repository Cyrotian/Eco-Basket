package com.ecoBasket.ecobasket.Dashboards;

import java.time.LocalDateTime;

public class OrderHistoryDTO {
    private Long orderId;
    private LocalDateTime orderDate;
    private double totalValue;
    private String status;
    private String shippingAddress;

    public OrderHistoryDTO(Long orderId, LocalDateTime orderDate, double totalValue, String status, String shippingAddress) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.totalValue = totalValue;
        this.status = status;
        this.shippingAddress = shippingAddress;
    }

    public Long getOrderId() { return orderId; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public double getTotalValue() { return totalValue; }
    public String getStatus() { return status; }
    public String getShippingAddress() { return shippingAddress; }
}
