package com.ecoBasket.ecobasket.Checkout;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PaymentRequest {
    
    @NotNull(message = "Order ID cannot be null")
    @Min(value = 1, message = "Order ID must be a positive number")
    private Integer orderId;

    @NotNull(message = "Total amount cannot be null")
    @Min(value = 0, message = "Total amount must be non-negative")
    private Double totalAmount;

    @NotNull(message = "Payment method is required")
    @Size(min = 3, max = 50, message = "Payment method should be between 3 and 50 characters")
    private String paymentMethod;

    // ✅ Constructor (Optional)
    public PaymentRequest() {}

    public PaymentRequest(Integer orderId, Double totalAmount, String paymentMethod) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
    }

    // ✅ Getters & Setters
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    @Override
    public String toString() {
        return "PaymentRequest{" +
                "orderId=" + orderId +
                ", totalAmount=" + totalAmount +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}
