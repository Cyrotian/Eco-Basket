package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders/history")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderHistoryController {

    @Autowired
    private OrderHistoryService service;

    @GetMapping
    public List<OrderHistoryDTO> getUserOrderHistory(@RequestParam Long userId) {
        return service.getOrderHistoryForUser(userId);
    }
}
