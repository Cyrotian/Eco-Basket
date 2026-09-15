package com.ecoBasket.ecobasket.Repos;

import com.ecoBasket.ecobasket.Models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> { 

    //  referencing productId
    @Query("SELECT i FROM Image i WHERE i.product.product_id = :productId")
    List<Image> findByProduct_ProductId(Long  productId);  // Product's productId field directly

}
