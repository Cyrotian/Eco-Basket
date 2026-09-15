package com.ecoBasket.ecobasket.Dashboards;

import com.ecoBasket.ecobasket.Dashboards.OrderSummaryDTO;
import java.util.List;

public interface SellerOrderRepoCustom {
    List<OrderSummaryDTO> getOrdersBySeller(Long sellerId);
}
