package com.ecoBasket.ecobasket.Dashboards;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class SellerDashboardRepoImpl implements SellerDashboardRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SellerDashboardDTO> getSellerStats(Long sellerId) {
        String sql = """
SELECT 
    s.seller_id,
    COUNT(DISTINCT p.product_id) AS product_count,
    COUNT(DISTINCT o.order_id) AS order_count,
    COALESCE(SUM(oi.price_per_unit * oi.quantity), 0) AS total_revenue,
    COALESCE(AVG(r.rating), 0) AS average_rating
FROM seller s
LEFT JOIN products p ON p.seller_id = s.seller_id
LEFT JOIN order_items oi ON oi.product_id = p.product_id
LEFT JOIN orders o ON o.order_id = oi.order_id
LEFT JOIN ratings r ON r.product_id = p.product_id
WHERE s.seller_id = :sellerId
GROUP BY s.seller_id;

        """;

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("sellerId", sellerId);

        List<Object[]> rows = query.getResultList();

        return rows.stream().map(row -> new SellerDashboardDTO(
                ((Number) row[0]).longValue(),
                ((Number) row[1]).intValue(),
                ((Number) row[2]).intValue(),
                (BigDecimal) row[3],
                ((Number) row[4]).doubleValue()
        )).collect(Collectors.toList());
    }
}

