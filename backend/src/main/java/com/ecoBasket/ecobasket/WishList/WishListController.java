package com.ecoBasket.ecobasket.WishList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoBasket.ecobasket.AddToCart.Product;
import com.ecoBasket.ecobasket.Services.NotificationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/wishlist")
public class WishListController {

    @Autowired
    private WishListService wishlistService;
    @Autowired
    private NotificationService notificationService;

    // Add product to wishlist
    @PostMapping("/add/{userId}/{productId}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            wishlistService.addProductToWishlist(userId, productId);
            return ResponseEntity.ok("Product added to wishlist");

        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }

    // Remove product from wishlist
    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            wishlistService.removeProductFromWishlist(userId, productId);
            return ResponseEntity.ok("Product removed from wishlist");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }
    //Get User Wishlist
    @GetMapping("/{userId}/saved-products")
    public ResponseEntity<List<Product>> getWishlist(@PathVariable Long userId) {
        try {
            List<Product> products = wishlistService.getWishlistForUser(userId);
            return ResponseEntity.ok(products);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); 
        }
    }
}
