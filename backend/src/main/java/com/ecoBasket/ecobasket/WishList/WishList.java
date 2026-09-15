package com.ecoBasket.ecobasket.WishList;

import jakarta.persistence.*;
import com.ecoBasket.ecobasket.User_regsitration.User;
import com.ecoBasket.ecobasket.AddToCart.Product;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "saved_products")
public class WishList {

    @EmbeddedId
    private WishListId id;

    @ManyToOne
    @MapsId("user")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("product")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, updatable = false, name = "saved_at")
    private Instant savedAt = Instant.now();
}
