package com.ecoBasket.ecobasket.Dashboards;

import java.math.BigDecimal;

public class SellerDashboardDTO {

    private Long sellerId;
    private int totalProducts;
    private int totalOrders;
    private BigDecimal totalRevenue;
    private double averageRating;

    // Default constructor
    public SellerDashboardDTO() {}

    // All-args constructor
    public SellerDashboardDTO(Long sellerId, int totalProducts, int totalOrders, BigDecimal totalRevenue, double averageRating) {
        this.sellerId = sellerId;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
        this.averageRating = averageRating;
    }

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
}
