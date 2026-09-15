package com.ecoBasket.ecobasket.AddToCart;

import com.ecoBasket.ecobasket.Checkout.Order;
import com.ecoBasket.ecobasket.Checkout.OrderRepository;
import com.ecoBasket.ecobasket.DTO.NotificationPostDTO;
import com.ecoBasket.ecobasket.Services.NotificationService;
import com.ecoBasket.ecobasket.User_regsitration.*;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cart")
public class CartController {

    private static final Logger logger = Logger.getLogger(CartController.class.getName());

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private com.ecoBasket.ecobasket.User_regsitration.UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationService notificationService;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    /**
     * ✅ **Add product to cart or update quantity if already present**
     */
    @PostMapping
    public ResponseEntity<String> addToCart(
            @RequestParam Long userId, // Changed to Long to match User entity
            @RequestParam Long productId, // Changed to Long to match Product entity
            @RequestParam int quantity,
            @RequestParam double price) { // Added price to store totalValue properly

        try {
            if (!userRepository.existsById(userId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ User not found.");
            }

            if (!productRepository.existsById(productId)) { // No need for Long.valueOf()
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Product not found.");
            }

            Cart existingCartItem = cartRepository.findByUserIdAndProductId(userId, productId);
            if (existingCartItem != null) {
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
                existingCartItem.setTotalValue(existingCartItem.getTotalValue() + (quantity * price));
                cartRepository.save(existingCartItem);
                return ResponseEntity.ok("✅ Product quantity updated in the cart.");
            }

            Cart newCartItem = new Cart(userId, productId, quantity, quantity * price);
            cartRepository.save(newCartItem);
            return ResponseEntity.ok("✅ Product added to cart successfully!");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Error adding to cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ An error occurred: " + e.getMessage());
        }
    }

    /**
     * ✅ **View cart for a specific user**
     */
    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> viewCart(@PathVariable Long userId) { // Changed to Long
        try {
            if (!userRepository.existsById(userId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            List<Cart> userCart = cartRepository.findByUserId(userId);
            return ResponseEntity.ok(userCart);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Error fetching cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * ✅ **Remove a specific product from the cart**
     */
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long userId, @PathVariable Long productId) { // Changed to Long
        try {
            cartRepository.deleteByUserIdAndProductId(userId, productId);
            return ResponseEntity.ok("✅ Product removed from cart successfully!");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Error removing from cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ An error occurred: " + e.getMessage());
        }
    }

    /**
     * ✅ **Clear entire cart for a user**
     */
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) { // Changed to Long
        try {
            cartRepository.deleteByUserId(userId);
            return ResponseEntity.ok("✅ Cart cleared successfully!");
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Error clearing cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ An error occurred: " + e.getMessage());
        }
    }

    /**
     * ✅ **Checkout process: Generates a Stripe PaymentIntent**
     */
    @PostMapping("/checkout/{userId}")
    public ResponseEntity<Map<String, String>> checkout(@PathVariable Long userId) { 
        List<Cart> cartItems = cartRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "❌ Cart is empty! Add items before checkout."));
        }

        // ✅ **Ensure totalValue is calculated properly**
        double totalValue = cartItems.stream()
                .mapToDouble(Cart::getTotalValue)
                .sum();

        Stripe.apiKey = stripeSecretKey;
        logger.info("Using Stripe Secret Key: " + stripeSecretKey);

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) (totalValue * 100)) // Convert dollars to cents
                    .setCurrency("usd")
                    .addPaymentMethodType("card")
                    .setCaptureMethod(PaymentIntentCreateParams.CaptureMethod.AUTOMATIC)
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            logger.info("✅ Successfully created PaymentIntent: " + paymentIntent.getId());

            return ResponseEntity.ok(Map.of("clientSecret", paymentIntent.getClientSecret()));

        } catch (StripeException e) {
            logger.log(Level.SEVERE, "❌ Stripe PaymentIntent Error", e);
            return ResponseEntity.status(500).body(Map.of("error", "❌ Payment failed: " + e.getMessage()));
        }
    }

    /**
     * ✅ **Confirm Stripe Payment & Process Order**
     */
    @PostMapping("/payment/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(
            @RequestParam("paymentIntentId") String paymentIntentId,
            @RequestParam("userId") Long userId) { // Changed to Long

        try {
            if (paymentIntentId == null || paymentIntentId.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "❌ Invalid Payment Intent ID."));
            }

            Stripe.apiKey = stripeSecretKey;

            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

            logger.info("✅ Retrieved PaymentIntent Status: " + paymentIntent.getStatus());

            if ("succeeded".equals(paymentIntent.getStatus())) {
                List<Cart> cartItems = cartRepository.findByUserId(userId);
                if (cartItems.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "❌ No items found in cart!"));
                }

                String productIds = cartItems.stream()
                        .map(cart -> String.valueOf(cart.getProductId()))
                        .collect(Collectors.joining(","));

                double totalValue = cartItems.stream()
                        .mapToDouble(Cart::getTotalValue)
                        .sum();

                Order newOrder = new Order(userId, totalValue, "Completed", "User Address Here");

                orderRepository.save(newOrder);

                cartRepository.deleteAll(cartItems);
                // Notification logic
                NotificationPostDTO notificationDTO = new NotificationPostDTO(
                userId,
                    "Your order has been placed successfully!. Order ID: " + newOrder.getOrderId() + "\n",
                    "Order Confirmation"
                );
                notificationService.createNotification(notificationDTO);
            
                
                return ResponseEntity.ok(Map.of("message", "✅ Payment successful! Order placed."));
            } else {
                return ResponseEntity.status(400).body(Map.of("error", "❌ Payment not confirmed!"));
            }
        } catch (StripeException e) {
            logger.log(Level.SEVERE, "❌ Error confirming payment", e);
            return ResponseEntity.status(500).body(Map.of("error", "❌ Error confirming payment: " + e.getMessage()));
        }
    }
}
