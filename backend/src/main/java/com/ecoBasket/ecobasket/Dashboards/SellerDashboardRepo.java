package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;

public interface SellerDashboardRepo {
    List<SellerDashboardDTO> getSellerStats(Long sellerId);
}
