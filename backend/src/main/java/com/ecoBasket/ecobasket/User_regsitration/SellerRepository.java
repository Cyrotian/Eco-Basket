package com.ecoBasket.ecobasket.User_regsitration;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface  SellerRepository extends JpaRepository <Seller,Long> {
  @Query("SELECT s FROM Seller s WHERE s.sellerId=:sellerId")
  Optional<Seller> findBySellerId(@Param("sellerId") Long sellerId);
 
}
