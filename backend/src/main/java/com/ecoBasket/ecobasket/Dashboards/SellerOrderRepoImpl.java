package com.ecoBasket.ecobasket.Dashboards;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class SellerOrderRepoImpl implements SellerOrderRepoCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<OrderSummaryDTO> getOrdersBySeller(Long sellerId) {
        String sql = """
                SELECT DISTINCT o.order_id, o.order_date, o.total_value, o.status
                FROM orders o
                JOIN order_items oi ON o.order_id = oi.order_id
                JOIN products p ON oi.product_id = p.product_id
                WHERE p.seller_id = :sellerId
                ORDER BY o.order_date DESC;
        """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("sellerId", sellerId);

        List<Object[]> rows = query.getResultList();

        return rows.stream()
                .map(row -> new OrderSummaryDTO(
                        ((Number) row[0]).longValue(),
                        (Timestamp) row[1],
                        (BigDecimal) row[2],
                        (String) row[3]
                ))
                .collect(Collectors.toList());
    }
}
