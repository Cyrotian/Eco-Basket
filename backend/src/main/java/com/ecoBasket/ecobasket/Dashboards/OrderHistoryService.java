package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderHistoryService {

    @Autowired
    private OrderHistoryRepo orderHistoryRepo;

    public List<OrderHistoryDTO> getOrderHistoryForUser(Long userId) {
        return orderHistoryRepo.getOrderHistoryByUser(userId);
    }
}