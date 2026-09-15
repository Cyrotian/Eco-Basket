package com.ecoBasket.ecobasket.WishList;

import com.ecoBasket.ecobasket.User_regsitration.User;
import com.ecoBasket.ecobasket.AddToCart.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<WishList, WishListId> {
    Optional<WishList> findById(WishListId id);

    Optional<WishList> findByUserAndProduct(User user, Product product);

    List<WishList> findByUser(User user);
}
