package com.ecoBasket.ecobasket.Dashboards;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class OrderHistoryRepoImpl implements OrderHistoryRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<OrderHistoryDTO> getOrderHistoryByUser(Long userId) {
        String sql = """
            SELECT o.order_id, o.order_date, o.total_value, o.status, o.shipping_address
            FROM orders o
            WHERE o.user_id = :userId
            ORDER BY o.order_date DESC
        """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("userId", userId);

        List<Object[]> results = query.getResultList();
        return results.stream().map(row -> new OrderHistoryDTO(
            ((Number) row[0]).longValue(),
            ((java.sql.Timestamp) row[1]).toLocalDateTime(),
            ((Number) row[2]).doubleValue(),
            (String) row[3],
            (String) row[4]
        )).collect(Collectors.toList());
    }
}