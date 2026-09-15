package com.ecoBasket.ecobasket.ratings;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")  // Links to existing "products" table
@Getter
@Setter
public class ProductForRatings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int product_id;  // Matches `product_id` in DB

    @Column(name = "name", nullable = false)
    private String name;  // Matches `name` in DB

    @Column(name = "category_id")
    private Integer categoryId;  // Matches `category_id` in DB

    @Column(name = "image_url")
    private String imageUrl;  // Matches `image_url` in DB
}
