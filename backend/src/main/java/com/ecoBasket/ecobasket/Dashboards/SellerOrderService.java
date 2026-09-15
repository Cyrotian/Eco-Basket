package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;

import com.ecoBasket.ecobasket.Dashboards.OrderSummaryDTO;

public interface SellerOrderService {
    List<OrderSummaryDTO> getOrdersBySeller(Long sellerId);
}
