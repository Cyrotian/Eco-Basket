package com.ecoBasket.ecobasket.Dashboards;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard/seller")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerDashboardController {

    @Autowired
    private SellerDashboardService sellerDashboardService;

    @Autowired
    private SellerOrderService sellerOrderService;

    @GetMapping
    public SellerDashboardDTO getSellerDashboard(@RequestParam Long sellerId) {
        List<SellerDashboardDTO> dashboards = sellerDashboardService.getSellerDashboard(sellerId);
        return dashboards.isEmpty() ? null : dashboards.get(0);
    }

    @GetMapping("/orders")
    public List<OrderSummaryDTO> getSellerOrders(@RequestParam Long sellerId) {
        return sellerOrderService.getOrdersBySeller(sellerId); 
    }
}
