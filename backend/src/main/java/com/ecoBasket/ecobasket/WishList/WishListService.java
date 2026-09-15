package com.ecoBasket.ecobasket.WishList;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoBasket.ecobasket.AddToCart.Product;
import com.ecoBasket.ecobasket.AddToCart.ProductRepository;
import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Services.NotificationService;
import com.ecoBasket.ecobasket.User_regsitration.User;
import com.ecoBasket.ecobasket.User_regsitration.UserRepository;

@Service
public class WishListService {

    private static final Logger logger = LoggerFactory.getLogger(WishListService.class);

    @Autowired
    private WishListRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;


    public void addProductToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

      
        Optional<WishList> existingWishlistItem = wishlistRepository.findByUserAndProduct(user, product);
        if (existingWishlistItem.isPresent()) {
            logger.info("Product {} is already in wishlist for user {}", productId, userId);
            return; 
        }

        // Create a new wishlist entry
        WishListId wishlistId = new WishListId(userId, productId);
        WishList wishlist = new WishList();
        wishlist.setId(wishlistId);
        wishlist.setUser(user);
        wishlist.setProduct(product);

        wishlistRepository.save(wishlist);

        
        NotificationPostDTO notificationDTO = new NotificationPostDTO(
        userId, 
        product.getProductName() + " has been added to your wishlist",
        "WISHLIST_UPDATE");

        notificationService.createNotification(notificationDTO);
        logger.info("Added product {} to wishlist for user {}", productId, userId);
    }

    public void removeProductFromWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        Optional<WishList> wishlistItem = wishlistRepository.findByUserAndProduct(user, product);
        if (wishlistItem.isPresent()) {
            wishlistRepository.delete(wishlistItem.get());

            NotificationPostDTO notificationDTO = new NotificationPostDTO(
                userId, 
                product.getProductName() + " has been removed from your wishlist",
                "WISHLIST_UPDATE");

            notificationService.createNotification(notificationDTO);
            logger.info("Removed product {} from wishlist for user {}", productId, userId);
        } else {
            logger.warn("Product {} is not in wishlist for user {}", productId, userId);
            throw new RuntimeException("Product not in wishlist for user");
        }
    }

    public List<Product> getWishlistForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        List<WishList> wishlistItems = wishlistRepository.findByUser(user);

        if (wishlistItems.isEmpty()) {
            logger.info("Wishlist is empty for user {}", userId);
        }

        return wishlistItems.stream()
                            .map(WishList::getProduct)
                            .collect(Collectors.toList());
    }
}
