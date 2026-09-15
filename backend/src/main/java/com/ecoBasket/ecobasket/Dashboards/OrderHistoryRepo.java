package com.ecoBasket.ecobasket.Dashboards;
import java.util.List;

public interface OrderHistoryRepo {
    List<OrderHistoryDTO> getOrderHistoryByUser(Long userId);
}
