import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ CAPTCHA explicitly added

// ✅ Use your correct **Publishable Key**
const stripePromise = loadStripe("pk_test_51Qz1TACryxwH1o0f9mrj5or0Oc9Z99p3O8WIP6XWANZ90ey9BzA5ZAAe53oEj7PtU9agCFHbX1EgSMPTfVFc5yRd00bGXc3pKj");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null); // ✅ CAPTCHA state added

  const userId = localStorage.getItem("userid") ; // ✅ Dynamic user ID fetching

  useEffect(() => {
    const fetchCartAndCreatePaymentIntent = async () => {
      try {
        setLoading(true);
        const cartResponse = await axios.get(`http://localhost:8080/cart/${userId}`);
        console.log("✅ Cart Response:", cartResponse.data);

        if (!Array.isArray(cartResponse.data)) {
          throw new Error("Invalid cart data format.");
        }

        setCartItems(cartResponse.data);
        const total = cartResponse.data.reduce((sum, item) => sum + item.quantity * 10, 0);
        setTotalAmount(total);

        // ✅ Create Stripe Payment Intent
        const paymentResponse = await axios.post(
          `http://localhost:8080/cart/checkout/${userId}`,
          { payment_method_options: { card: { request_three_d_secure: "automatic" } } },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("✅ Payment Intent Response:", paymentResponse.data);

        if (typeof paymentResponse.data === "string") {
          setClientSecret(paymentResponse.data);
        } else if (paymentResponse.data.clientSecret) {
          setClientSecret(paymentResponse.data.clientSecret);
        } else {
          throw new Error("Failed to retrieve client secret.");
        }
      } catch (error) {
        console.error("❌ Error fetching cart or creating payment intent:", error);
        setMessage("❌ Failed to load cart or initiate payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndCreatePaymentIntent();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setMessage("❌ Stripe is not loaded. Try again.");
      return;
    }

    if (!captchaValue) { // ✅ CAPTCHA validation before payment
      setMessage("❌ Please complete CAPTCHA verification.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 1: Verify CAPTCHA on backend before proceeding
      const captchaResponse = await axios.post(
        "http://localhost:8080/cart/payment/verify-captcha",
        { captchaValue },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ CAPTCHA Verification Response:", captchaResponse.data);

      if (!captchaResponse.data.success) {
        setMessage("❌ CAPTCHA verification failed. Please try again.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setMessage("❌ Card details missing.");
        setLoading(false);
        return;
      }

      console.log("✅ Received clientSecret:", clientSecret);
      const actualClientSecret = typeof clientSecret === "string" ? clientSecret : clientSecret.clientSecret;

      if (!actualClientSecret) {
        setMessage("❌ Payment cannot be processed. No valid client secret received.");
        setLoading(false);
        return;
      }

      // ✅ Step 2: Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(actualClientSecret, {
        payment_method: { card: cardElement },
      });

      console.log("✅ Stripe confirmCardPayment result:", result);

      if (result.error) {
        console.error("❌ Payment failed:", result.error);
        setMessage(`❌ Payment failed: ${result.error.message}`);
      } else {
        console.log("✅ Payment Success:", result.paymentIntent);

        // ✅ Step 3: Notify Backend of Payment Success
        await axios.post(
          `http://localhost:8080/cart/payment/confirm-payment`,
          { paymentIntentId: result.paymentIntent.id, userId },
          { headers: { "Content-Type": "application/json" } }
        );

        setMessage("✅ Payment successful!");
        setCartItems([]);
        setTotalAmount(0);
      }
    } catch (error) {
      console.error("❌ Payment processing error:", error);
      setMessage("❌ Payment processing error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Checkout</h2>
        {message && <p style={message.includes("❌") ? styles.error : styles.success}>{message}</p>}

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <p key={index}>Product ID: {item.productId}, Quantity: {item.quantity}</p>
            ))}
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <form onSubmit={handleSubmit}>
              <CardElement options={{ style: { base: { fontSize: "16px", color: "#424770" } } }} />

              {/* ✅ CAPTCHA explicitly integrated */}
              <ReCAPTCHA
                sitekey="6LeU9PkqAAAAABrnSE1jfPlcOQIZX8P0HVYlo_vt"
                onChange={(value) => setCaptchaValue(value)}
              />

              <button type="submit" disabled={!stripe || loading} style={styles.button}>
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ All original styling exactly preserved
const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    width: "400px"
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%"
  },
  success: { color: "green", fontWeight: "bold", marginTop: "10px" },
  error: { color: "red", fontWeight: "bold", marginTop: "10px" },
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
