package com.ecoBasket.ecobasket.Dashboards;
import com.ecoBasket.ecobasket.Dashboards.OrderSummaryDTO;
import com.ecoBasket.ecobasket.Dashboards.SellerOrderRepoCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerOrderServiceImpl implements SellerOrderService {

    @Autowired
    private SellerOrderRepoCustom sellerOrderRepo;

    @Override
    public List<OrderSummaryDTO> getOrdersBySeller(Long sellerId) {
        return sellerOrderRepo.getOrdersBySeller(sellerId);
    }
}
