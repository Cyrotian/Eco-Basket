package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;
import com.ecoBasket.ecobasket.Dashboards.SellerDashboardRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerDashboardService {

    @Autowired
    private SellerDashboardRepo sellerDashboardRepository;

    public List<SellerDashboardDTO> getSellerDashboard(Long sellerId) {
        return sellerDashboardRepository.getSellerStats(sellerId);
    }
}
