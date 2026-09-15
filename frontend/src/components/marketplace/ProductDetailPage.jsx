import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/ProductPage.css";
import axios from "axios"; 

function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistStatus, setWishlistStatus] = useState(false); 
    const [suggestedLoading, setSuggestedLoading] = useState(true);
    const [cartProductIds, setCartProductIds] = useState(new Set());

    const userId = BigInt(localStorage.getItem("userid"));

    useEffect(() => {
        fetchProduct(productId);
        fetchSuggestedProducts(); 
    }, [productId]); 

    const fetchProduct = async (product_id) => {
        setLoading(true);
        setProduct(null);
        setRelatedProducts([]);

        try {
            const response = await fetch(`http://localhost:8080/product/${product_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProduct(data);

            if (data.category) {
                fetchRelatedProducts(data.category.id);
            }

            checkWishlistStatus(product_id); 
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8080/product/category/${categoryId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRelatedProducts(data.content || []);
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    const fetchSuggestedProducts = async () => {
        setSuggestedLoading(true); 
        try {
            const response = await fetch(`http://localhost:8080/product/suggestions`);
            console.log("Response status:", response.status); 
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Fetched suggested products:", data); 
    
            setSuggestedProducts(data || []);
        } catch (error) {
            console.error("Error fetching suggested products:", error);
        } finally {
            setSuggestedLoading(false); 
        }
    };

    const checkWishlistStatus = async (product_id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/wishlist/${userId}/saved-products`);
            if (!response.ok) {
                console.error("API error:", response.status, response.statusText);
                return;
            }
            const data = await response.json();
            
            
            const isProductInWishlist = data.some(item => item.product_id === parseInt(product_id));
            setWishlistStatus(isProductInWishlist);
        } catch (error) {
            console.error("Error checking wishlist status:", error);
        }
    };

    const handleAddToWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/wishlist/add/${userId}/${product.product_id}`, {
                method: 'POST',
            });
            if (response.ok) {
                setWishlistStatus(true);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/wishlist/remove/${userId}/${product.product_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setWishlistStatus(false);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const handleProductClick = (newProductId) => {
        if (newProductId !== productId) {
            
            navigate(`/product-detail/${newProductId}`);
        }
    };

    if (loading || !product) return <p className="loading-message">Loading product details...</p>;



    const showToast = (message, type) => {
        alert(`${type.toUpperCase()}: ${message}`); 
    };  

    const addToCart = async (productId, price) => {
        try {
            const quantity = 1;
            await axios.post(`http://localhost:8080/cart`, null, {
                params: {
                    userId,
                    productId,
                    quantity,
                    price,
                }
            });
            showToast("✅ Product added to cart.", "success");
            setCartProductIds(prev => new Set(prev).add(productId));
        } catch (err) {
            showToast("❌ Failed to add item.", "error");
        }
    };
    
    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/cart/${userId}/${productId}`);
            showToast("✅ Item removed from cart.", "success");
            setCartProductIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        } catch (err) {
            showToast("❌ Failed to remove item.", "error");
        }
    };
    const handleToggleCart = (productId, price) => {
        if (cartProductIds.has(productId)) {
            removeFromCart(productId);
        } else {
            addToCart(productId, price);
        }
    };




    return (
        <div className="product-container">
            {/* Product Details */}
            <div className="product-details">
                <img src={product.image_url} alt={product.productName} className="product-image" loading="lazy" />
                <div className="product-info">
                    <h1 className="product-title">{product.productName}</h1>
                    <p className="product-description">{product.product_description}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-category">Category: {product.category.name}</p>

                    <div className="button-group">
                    <button
                         className="add-to-cart"
                             onClick={(e) => {
                             e.stopPropagation(); // prevent triggering navigate
                             handleToggleCart(product.product_id, product.price);
                             }}
                                >
                         {cartProductIds.has(product.product_id) ? "Remove from Cart " : "Add to Cart"}
                        </button>


                        {wishlistStatus ? (
                            <button className="remove-from-wishlist" onClick={handleRemoveFromWishlist}>
                                ❤️ Remove from Wishlist
                            </button>
                        ) : (
                            <button className="add-to-wishlist" onClick={handleAddToWishlist}>
                                ❤️ Add to Wishlist
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 ? (
                <div className="related-products">
                    <h2>Related Products</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((item) => (
                            <div 
                                key={item.product_id} 
                                className="related-product-card"
                                onClick={() => handleProductClick(item.product_id)}
                            >
                                <img src={item.image_url} alt={item.productName} className="related-product-image" loading="lazy" />
                                <h3>{item.productName}</h3>
                                <p className="related-product-price">${item.price}</p>
                                <button className="view-details">View Details</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-related-products">No related products available.</div>
            )}


             {/* Suggested Products */}
             {suggestedLoading ? (
                <div className="loading-placeholder">Loading suggested products...</div>
            ) : suggestedProducts.length > 0 ? (
                <div className="suggested-products">
                    <h2>Suggested Products</h2>
                    <div className="suggested-products-grid">
                        {suggestedProducts.map((item) => (
                            <div 
                                key={item.product_id} 
                                className="suggested-product-card"
                                onClick={() => handleProductClick(item.product_id)}
                            >
                                <img src={item.image_url} alt={item.productName} className="suggested-product-image" loading="lazy" />
                                <h3>{item.productName}</h3>
                                <p className="suggested-product-price">${item.price}</p>
                                <button className="view-details">View Details</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-suggested-products">No suggested products available.</div>
            )}
        </div>
    );
}

export default ProductPage;
