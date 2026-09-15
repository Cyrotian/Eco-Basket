package com.ecoBasket.ecobasket.ratings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class ProductForRatingsController {

    @Autowired
    private ProductForRatingsRepository productForRatingsRepository;

    // Get all products (for ratings page)
    @GetMapping
    public ResponseEntity<List<ProductForRatings>> getAllProductsForRatings() {
        List<ProductForRatings> products = productForRatingsRepository.findAll();
        return ResponseEntity.ok(products);
    }

    // Get a single product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<ProductForRatings> getProductById(@PathVariable int productId) {
        return productForRatingsRepository.findById(productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
