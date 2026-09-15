package com.ecoBasket.ecobasket.Dashboards;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class OrderSummaryDTO {
    private Long orderId;
    private Timestamp orderDate;
    private BigDecimal totalValue;
    private String status;

    public OrderSummaryDTO(Long orderId, Timestamp orderDate, BigDecimal totalValue, String status) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.totalValue = totalValue;
        this.status = status;
    }

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Timestamp getOrderDate() { return orderDate; }
    public void setOrderDate(Timestamp orderDate) { this.orderDate = orderDate; }

    public BigDecimal getTotalValue() { return totalValue; }
    public void setTotalValue(BigDecimal totalValue) { this.totalValue = totalValue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
