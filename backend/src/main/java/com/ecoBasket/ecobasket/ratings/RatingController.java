package com.ecoBasket.ecobasket.ratings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:3000") // Allows frontend access
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    // Get all ratings for a product
    @GetMapping("/{productId}")
    public ResponseEntity<List<Rating>> getRatingsByProduct(@PathVariable Long productId) {
        List<Rating> ratings = ratingRepository.findByProductId(productId);
        return ResponseEntity.ok(ratings);
    }

    // Submit a new rating
    @PostMapping("/submit")
    public ResponseEntity<Rating> submitRating(@RequestBody Rating rating) {
        Rating savedRating = ratingRepository.save(rating);
        return ResponseEntity.ok(savedRating);
    }

   
}
