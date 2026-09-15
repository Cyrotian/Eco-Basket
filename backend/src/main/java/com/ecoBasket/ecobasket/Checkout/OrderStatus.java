package com.ecoBasket.ecobasket.Checkout;

import java.util.HashMap;
import java.util.Map;

public enum OrderStatus {
    PENDING("Pending"),
    SHIPPED("Shipped"),
    DELIVERED("Delivered"),
    CANCELLED("Cancelled"),
    COMPLETED("Completed");

    private final String displayName;
    private static final Map<String, OrderStatus> LOOKUP = new HashMap<>();

    static {
        for (OrderStatus status : OrderStatus.values()) {
            LOOKUP.put(status.getDisplayName(), status);
        }
    }

    OrderStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    /**
     * Get the corresponding OrderStatus enum from a string value.
     * This method ensures compatibility when fetching status from the database.
     */
    public static OrderStatus fromString(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Invalid Order Status: " + value);
        }
        OrderStatus status = LOOKUP.get(value);
        if (status == null) {
            throw new IllegalArgumentException("Unknown Order Status: " + value);
        }
        return status;
    }
}
