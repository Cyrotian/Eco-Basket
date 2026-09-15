package com.ecoBasket.ecobasket.AddToCart;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; 


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findById(Long productId);  //

    // Check if a product exists by its ID
    boolean existsById(Long product_id);


    // Find products by category
    Page<Product> findByCategory_id(String categoryId, Pageable pageable);

 
    List<Product>findAll();

    // Find products by seller ID
    List<Product> findBySeller_SellerId(Long sellerId);

    // Find products with a name containing a keyword
    List<Product> findByProductNameContainingIgnoreCase(String keyword);
}