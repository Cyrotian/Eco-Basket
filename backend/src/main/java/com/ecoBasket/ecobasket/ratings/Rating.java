package com.ecoBasket.ecobasket.ratings;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@NoArgsConstructor
public class Rating {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId; // Primary Key

    @Column(name = "product_id", nullable = false) // Explicitly mapping to database column
    private Long productId; // Links rating to a product

    @Column(name = "user_id", nullable = false) // Explicitly mapping to database column
    private Long userId; // Links rating to a user

    @Column(nullable = false)
    private int rating; // Stores rating (1-5 stars)

    @Column(columnDefinition = "TEXT")
    private String review; // Optional review text

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp for when a review is made
}
