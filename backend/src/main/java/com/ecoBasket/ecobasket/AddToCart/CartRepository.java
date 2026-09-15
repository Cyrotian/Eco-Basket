package com.ecoBasket.ecobasket.AddToCart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

// ✅ Cart Repository Interface
public interface CartRepository extends JpaRepository<Cart, Long> {

    /**
     * ✅ Find all cart items for a specific user
     */
    List<Cart> findByUserId(Long id);

    /**
     * ✅ Find a specific cart item by user ID and product ID
     */
    Cart findByUserIdAndProductId(Long id, Long productId);

    /**
     * ✅ Delete a specific cart item for a user
     */
    @Transactional
    void deleteByUserIdAndProductId(Long id, Long productId);

    /**
     * ✅ Query to find items with quantity greater than a given value
     */
    @Query("SELECT c FROM Cart c WHERE c.userId = :userId AND c.quantity > :quantity")
    List<Cart> findLargeQuantityItems(@Param("id") Long id, @Param("quantity") int quantity);

    /**
     * ✅ Clear all cart items for a user
     */
    @Transactional
    void deleteByUserId(Long id);
}
