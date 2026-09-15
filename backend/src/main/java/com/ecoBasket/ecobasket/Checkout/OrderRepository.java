package com.ecoBasket.ecobasket.Checkout;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

    
    Page<Order> findByUserId(Long userId, Pageable pageable);

    
    List<Order> findByUserIdAndStatus(Long userId, String status);

    
    Optional<Order> findByPaymentIntentId(String paymentIntentId);
}
