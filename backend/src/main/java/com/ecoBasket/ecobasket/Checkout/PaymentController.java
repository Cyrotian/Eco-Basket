package com.ecoBasket.ecobasket.Checkout;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ecoBasket.ecobasket.AddToCart.Cart;
import com.ecoBasket.ecobasket.AddToCart.CartRepository;

@RestController
@RequestMapping("/cart/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private static final Logger logger = Logger.getLogger(PaymentController.class.getName());

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${google.recaptcha.secret-key}")
    private String recaptchaSecret;

    // ✅ Define a RestTemplate Bean for reCAPTCHA validation
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * ✅ Confirm Stripe Payment & Process Order
     */
    @PostMapping("/confirm-payment")
    public ResponseEntity<Map<String, String>> confirmPayment(@RequestBody Map<String, Object> payload) {
        try {
            // Check if the payload contains necessary keys
            if (!payload.containsKey("paymentIntentId") || !payload.containsKey("userId")) {
                return ResponseEntity.badRequest().body(Map.of("error", "❌ Missing paymentIntentId or userId."));
            }

            String paymentIntentId = payload.get("paymentIntentId").toString();
            Long userId = ((Number) payload.get("userId")).longValue();  // Use Long for userId as per User entity

            // ✅ Check if Stripe API Key is set
            if (stripeSecretKey == null || stripeSecretKey.isEmpty()) {
                return ResponseEntity.status(500).body(Map.of("error", "❌ Stripe API Key is not configured!"));
            }

            Stripe.apiKey = stripeSecretKey;
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

            logger.info("✅ Retrieved PaymentIntent Status: " + paymentIntent.getStatus());

            if ("succeeded".equals(paymentIntent.getStatus())) {
                // Fetch cart items for the user
                List<Cart> cartItems = cartRepository.findByUserId(userId);  // Use userId to fetch cart items
                if (cartItems.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "❌ No items found in cart."));
                }

                // Calculate the total value of the cart
                double totalValue = cartItems.stream().mapToDouble(Cart::getTotalValue).sum();

                // Save order linked with the userId
                Order newOrder = new Order(userId, totalValue, "Completed", "User Address Here");
                newOrder.setPaymentIntentId(paymentIntentId);
                orderRepository.save(newOrder);

                // Clear the cart after order completion
                cartRepository.deleteAll(cartItems);
                logger.info("✅ Order Created for User ID: " + userId + ", Order ID: " + newOrder.getOrderId());

                return ResponseEntity.ok(Map.of("message", "✅ Payment successful! Order placed."));
            } else {
                return ResponseEntity.status(400).body(Map.of("error", "❌ Payment not confirmed."));
            }
        } catch (StripeException e) {
            logger.log(Level.SEVERE, "❌ Stripe API Error during payment confirmation", e);
            return ResponseEntity.status(500).body(Map.of("error", "❌ Stripe error: " + e.getMessage()));
        }
    }

    /**
     * ✅ Process Refund Endpoint
     */
    @PostMapping("/refund-payment")
    public ResponseEntity<Map<String, String>> refundPayment(@RequestBody Map<String, Object> payload) {
        try {
            // Check if the payload contains necessary keys
            if (!payload.containsKey("paymentIntentId") || !payload.containsKey("refundAmount")) {
                return ResponseEntity.badRequest().body(Map.of("error", "❌ Missing paymentIntentId or refundAmount."));
            }

            String paymentIntentId = payload.get("paymentIntentId").toString();
            double refundAmount = Double.parseDouble(payload.get("refundAmount").toString());
            Long userId = ((Number) payload.get("userId")).longValue();  // Use Long for userId as per User entity

            Stripe.apiKey = stripeSecretKey;

            Map<String, Object> params = Map.of(
                "payment_intent", paymentIntentId,
                "amount", (int) (refundAmount * 100) // Convert dollars to cents
            );

            Refund refund = Refund.create(params);

            // Find the associated order by paymentIntentId
            Optional<Order> orderOptional = orderRepository.findByPaymentIntentId(paymentIntentId);
            if (orderOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "❌ Order not found."));
            }
            Order order = orderOptional.get();

            // Store refund information with the userId
            order.setRefundId(refund.getId());
            order.setRefundAmount(refundAmount);
            order.setRefundStatus(refund.getStatus());
            order.setRefundDate(LocalDateTime.now());
            orderRepository.save(order);

            logger.info("✅ Refund processed for Order ID: " + order.getOrderId() + " by User ID: " + userId);

            return ResponseEntity.ok(Map.of("message", "✅ Refund processed successfully."));
        } catch (StripeException e) {
            logger.log(Level.SEVERE, "❌ Stripe Error during refund", e);
            return ResponseEntity.status(500).body(Map.of("error", "❌ Stripe error: " + e.getMessage()));
        }
    }

    /**
     * ✅ Verify reCAPTCHA for payment processing
     */
    @PostMapping("/verify-captcha")
    public ResponseEntity<Map<String, Object>> verifyCaptcha(@RequestBody Map<String, String> payload) {
        try {
            // Check if captcha value is present in the payload
            if (!payload.containsKey("captchaValue")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "❌ Missing captchaValue."
                ));
            }
    
            String token = payload.get("captchaValue");
            String verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + recaptchaSecret + "&response=" + token;
    
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> response = restTemplate.postForObject(verifyUrl, null, Map.class);
    
            boolean success = response != null && Boolean.TRUE.equals(response.get("success"));
    
            if (success) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "✅ CAPTCHA verified."
                ));
            } else {
                logger.warning("❌ CAPTCHA verification failed: " + response);
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "error", "❌ CAPTCHA verification failed."
                ));
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Unexpected error during CAPTCHA verification", e);
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", "❌ Unexpected error: " + e.getMessage()
            ));
        }
    }
}
