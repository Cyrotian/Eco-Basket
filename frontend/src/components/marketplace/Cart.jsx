import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");
  const [miniCart, setMiniCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Ensure `userId` is a valid number
  const userIdStr = localStorage.getItem("userid");
  const userId = userIdStr ? Number(userIdStr) : null;

  // ✅ Toast Notification
  const showToast = (message, type = "success", showCheckout = false) => {
    toast[type](
      <div>
        <p>{message}</p>
        {showCheckout && (
          <div style={styles.toastButtons}>
            <button onClick={() => toast.dismiss()} style={styles.continueButton}>
              🛒 Continue Shopping
            </button>
            <button onClick={() => navigate("/checkout")} style={styles.checkoutButton}>
              🏁 Go to Checkout
            </button>
          </div>
        )}
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      }
    );
  };

  // ✅ Add Item to Cart
  const addToCart = async () => {
    if (!userId || isNaN(userId)) {
      showToast("❌ Invalid User ID. Please log in again.", "error");
      return;
    }

    if (!productId || quantity <= 0) {
      showToast("❌ Invalid Product ID or Quantity.", "error");
      return;
    }

    console.log(userId);

    try {
      await axios.post("http://localhost:8080/cart", {
        userId,
        productId,
        quantity,
        price: 10, //
      });

      showToast("✅ Product added to cart.", "success", true);
      loadCart();
    } catch (err) {
      showToast("❌ Failed to add item.", "error");
    }
  };

  // ✅ Load Cart Items
  const loadCart = async () => {
    if (!userId || isNaN(userId)) {
      console.error("❌ Invalid user ID, cannot load cart.");
      return;
    }

    try {
      console.log("🔄 Fetching cart...");
      const response = await axios.get(`http://localhost:8080/cart/${userId}`);
      console.log("✅ Cart Data:", response.data);

      console.log(userId);

      if (response.data && Array.isArray(response.data)) {
        setMiniCart(response.data);
      } else {
        console.error("❌ Invalid cart data format:", response.data);
        setMiniCart([]);
      }
    } catch (err) {
      console.error("❌ Failed to load cart:", err);
      showToast("❌ Failed to load cart.", "error");
      setMiniCart([]);
    }
  };

  // ✅ Remove Item from Cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${userId}/${productId}`);
      showToast("✅ Item removed from cart.", "success");

      // ✅ Update UI by removing the item from state
      setMiniCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    } catch (err) {
      showToast("❌ Failed to remove item.", "error");
    }
  };

  // ✅ Clear Entire Cart
  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/cart/clear/${userId}`);
      showToast("✅ Cart cleared successfully!", "success");
      setMiniCart([]); // Reset state after clearing cart
    } catch (err) {
      showToast("❌ Failed to clear cart.", "error");
    }
  };

  // ✅ Load cart only when `userId` is available
  useEffect(() => {
    if (userId) {
      loadCart();
    }
  }, [userId]);

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h1 style={styles.heading}>Organic Product</h1>

        <label style={styles.label}>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={styles.input}
            min="1"
          />
        </label>

        <button onClick={addToCart} style={styles.button}>
          Add to Cart
        </button>

        <h2 style={styles.subHeading}>Mini Cart</h2>
        {miniCart.length === 0 ? (
          <p style={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          <>
            <ul style={styles.cartList}>
              {miniCart.map((item) => (
                <li key={item.productId} style={styles.cartItem}>
                  <span>
                    <strong>Product ID:</strong> {item.productId}, <strong>Quantity:</strong>{" "}
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    style={styles.removeButton}
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={clearCart} style={styles.clearButton}>
              🗑️ Clear Cart
            </button>
            <button onClick={() => navigate("/checkout")} style={styles.checkoutButtonFull}>
              🏁 Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ Styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    width: "400px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    marginBottom: "5px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
};

export default Cart;
