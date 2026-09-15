import { useEffect, useRef, useState } from "react";
import "../css/Profile.css";
import axios from "axios";
import SellerDashboard from "./SellerDashboard";
import ProductListingPage from '../media/ProductListingPage';
import InventoryTracker from "./Inventory";
import OrderHistoryPage from "./OrderHistory";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("blogs");
  const [isEditing, setIsEditing] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    Streetaddress: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    additionalInfo: "",
  });

  const ProfileRef = useRef(null);
  const orderHistoryRef = useRef(null);
  const savedSectionRef = useRef(null);
  const dashboardRef = useRef(null);
  const productRef = useRef(null);

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.address) {
        const addressParts = userData.address.split(",");
        userData.Streetaddress = addressParts[0] || "";
        userData.city = addressParts[1] || "";
        userData.state = addressParts[2] || "";
        userData.postalcode = addressParts[3] || "";
        userData.country = addressParts[4] || "";
      }

      setUser(userData);
      setUpdatedUser({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        Streetaddress: userData.Streetaddress || "",
        city: userData.city || "",
        state: userData.state || "",
        postalcode: userData.postalcode || "",
        country: userData.country || "",
        additionalInfo: userData.additionalInfo || "",
      });

      fetchOrderHistory(userData.id);
    }

    fetchSavedProducts();
    fetchSavedBlogs();
  }, []);

  const fetchSavedProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/wishlist/${userId}/saved-products`);
      setSavedProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching saved products:", error);
      setSavedProducts([]);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!productId) return;
    try {
      await axios.delete(`http://localhost:8080/api/wishlist/remove/${userId}/${productId}`);
      setSavedProducts(savedProducts.filter(product => product.product_id !== productId));
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!updatedUser.Streetaddress || !updatedUser.city || !updatedUser.state || !updatedUser.postalcode || !updatedUser.country) {
      alert("Please fill in all the address fields.");
      return;
    }

    const combinedAddress = `${updatedUser.Streetaddress}, ${updatedUser.city}, ${updatedUser.state}, ${updatedUser.postalcode}, ${updatedUser.country}`;
    const updatedUserData = { ...updatedUser, address: combinedAddress, id: userId };

    try {
      const response = await axios.put("http://localhost:8080/updateUser", updatedUserData);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const fetchSavedBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/blogs/saved/details?userId=${userId}`);
      setSavedBlogs(response.data || []);
    } catch (error) {
      console.error("Error fetching saved blogs:", error);
    }
  };

  const handleUnsaveBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:8080/blogs/${blogId}/unsave`, {
        params: { userId: userId },
      });
      setSavedBlogs(savedBlogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.error("Error removing blog:", error);
    }
  };

  const fetchOrderHistory = async () => {
    const userIdnum = Number(userId);
    try {
      const response = await axios.get(`http://localhost:8080/orders/user/${userIdnum}`);
      setOrderHistory(response.data || []);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const handleToggleForm = () => {
    setShowAddProduct(prev => !prev);
  };

  return (
    <div className="profile-main-div">
      <ul className="profile-nav-list">
        <li><button onClick={() => ProfileRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-link">Profile</button></li>
        <li><button onClick={() => orderHistoryRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-link">Orders</button></li>
        <li><button onClick={() => savedSectionRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-link">Saved</button></li>
        {user?.userType === "SELLER" && (
          <>
            <li><button onClick={() => dashboardRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-link">Dashboard</button></li>
            <li><button onClick={() => productRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-link">Products</button></li>
          </>
        )}
      </ul>

      <div className="user-info-div" ref={ProfileRef}>
        {user ? (
          isEditing ? (
            <div className="edit-form">
              {["name", "email", "phone", "Streetaddress", "city", "state", "postalcode", "country"].map(field => (
                <label key={field}>
                  {field.replace(/^\w/, c => c.toUpperCase())}:
                  <input type="text" name={field} value={updatedUser[field]} onChange={handleChange} />
                </label>
              ))}
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="user-info">
              <p><strong>Full Name:</strong> {user.name || "No name provided"}</p>
              <p><strong>Email:</strong> {user.email || "No email provided"}</p>
              <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
              <p><strong>Shipping Address:</strong> {user.address || "No address saved"}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )
        ) : <p>No profile data found</p>}
      </div>

      <div className="Additional-section">
        <div ref={orderHistoryRef} className="order-detail-div">
          <OrderHistoryPage userId={userId} />
        </div>

        <div ref={savedSectionRef} className="saved-section">
          <div className="toggle-buttons">
            <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>Saved Blogs</button>
            <button className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>Saved Products</button>
          </div>

          {activeTab === "blogs" && (
            savedBlogs.length > 0 ? (
              <div className="saved-blogs-table">
                <div className="saved-blogs-list">
                  {savedBlogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                      <div className="blog-thumbnail">
                        <img src={blog.imageUrl} alt={blog.title} />
                      </div>
                      <div className="blog-info">
                        <a href={`/blog/${blog.id}`} className="blog-title">{blog.title}</a>
                        <p className="blog-snippet">{blog.content.slice(0, 100)}...</p>
                        <p className="blog-author">by {blog.author || "Unknown"}</p>
                      </div>
                      <div className="blog-likes-remove">
                        <span className="likes-count">❤️ {blog.likes}</span>
                        <button
                          className="unsave-btn"
                          onClick={() => handleUnsaveBlog(blog.id)}
                          title="Remove from saved"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No saved blogs.</p>
            )
          )}

          {activeTab === "products" && (
            <div className="saved-products-list">
              {savedProducts.length > 0 ? (
                savedProducts.map(product => (
                  <div key={product.product_id} className="saved-product-card">
                    <img src={product.image_url} alt={product.productName} className="saved-product-image" />
                    <h3>{product.productName}</h3>
                    <p className="saved-product-price">${product.price}</p>
                    <button className="remove-from-wishlist" onClick={() => handleRemoveFromWishlist(product.product_id)}>
                      ❌ Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>No saved products.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {user?.userType === "SELLER" && (
        <div className="seller-section">
          <button className="toggle-add-product-btn" onClick={handleToggleForm}>
            {showAddProduct ? "Cancel" : "Add New Product"}
          </button>

          <div ref={productRef}>
            {showAddProduct && <ProductListingPage />}
            <InventoryTracker />
          </div>

          <div ref={dashboardRef}>
            <SellerDashboard />
          </div>
        </div>
      )}
    </div>
  );
}
