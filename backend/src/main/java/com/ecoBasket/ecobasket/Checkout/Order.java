package com.ecoBasket.ecobasket.Checkout;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "order_date", updatable = false, nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "total_value", nullable = false)
    private double totalValue;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "Pending";

    @Column(name = "shipping_address", nullable = false, length = 255)
    private String shippingAddress = "Not Provided";

    // ✅ Newly added refund/payment fields
    @Column(name = "payment_intent_id")
    private String paymentIntentId;

    @Column(name = "refund_id")
    private String refundId;

    @Column(name = "refund_amount")
    private Double refundAmount;

    @Column(name = "refund_status")
    private String refundStatus;

    @Column(name = "refund_date")
    private LocalDateTime refundDate;

    // ✅ Automatically sets `orderDate` when a new order is created
    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
    }

    // ✅ Default Constructor
    public Order() {}

    // ✅ Main Constructor
    public Order(Long userId, double totalValue, String status, String shippingAddress) {
        this.userId = userId;
        this.totalValue = totalValue;
        this.status = (status != null && !status.isEmpty()) ? status : "Pending";
        this.shippingAddress = (shippingAddress != null && !shippingAddress.isEmpty()) ? shippingAddress : "Not Provided";
    }

    // ✅ Getters and Setters (All fields explicitly listed clearly)

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public String getRefundId() {
        return refundId;
    }

    public void setRefundId(String refundId) {
        this.refundId = refundId;
    }

    public Double getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(Double refundAmount) {
        this.refundAmount = refundAmount;
    }

    public String getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(String refundStatus) {
        this.refundStatus = refundStatus;
    }

    public LocalDateTime getRefundDate() {
        return refundDate;
    }

    public void setRefundDate(LocalDateTime refundDate) {
        this.refundDate = refundDate;
    }
}
