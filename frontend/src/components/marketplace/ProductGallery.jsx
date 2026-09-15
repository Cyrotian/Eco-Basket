import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Products_gallery.css";
import axios from "axios";

const categoryMapping = {
    "VEG001": "Vegetables",
    "FRU002": "Fruits",
    "HER003": "Herbs",
    "BEV004": "Beverages",
    "FOO005": "Food Products",
};

function ProductGallery() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [groupedProducts, setGroupedProducts] = useState({});
    const [cartProductIds, setCartProductIds] = useState(new Set());
    const userId = localStorage.getItem("userid"); 
    const observerRef = useRef(null);
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        let url = `http://localhost:8080/product/page?page=${page}&size=10`;

        if (searchTerm) {
            url = `http://localhost:8080/product/search?keyword=${searchTerm}`;
        } else if (category && category !== "") {
            url = `http://localhost:8080/product/category/${category}`;
        } else if (category === "") {
            url = `http://localhost:8080/product`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            console.log ("Products fetched ", data)
            const productList = Array.isArray(data) ? data : data.content;

            const mappedProducts = productList.map(product => ({
                ...product,
                product_id: BigInt(product.product_id),
                categoryName: categoryMapping[product.category?.id] || "Unknown Category",
                imageUrl: product.image_url || "/default-fallback-image.jpg",
            }));

            setProducts(mappedProducts);
            if (category && category !== "") {
                setTotalPages(data.totalPages || 1);
            }
            if (!searchTerm && !category) {
                groupByCategory(mappedProducts);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [searchTerm, category, page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const groupByCategory = useCallback((productList) => {
        const grouped = productList.reduce((acc, product) => {
            if (!acc[product.categoryName]) {
                acc[product.categoryName] = [];
            }
            acc[product.categoryName].push(product);
            return acc;
        }, {});
        setGroupedProducts(grouped);
    }, []);

    useEffect(() => {
        const loadMoreOnScroll = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && page < totalPages - 1) {
                    setPage(prevPage => prevPage + 1);
                }
            });
        };

        const observer = new IntersectionObserver(loadMoreOnScroll, { rootMargin: '200px' });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [page, totalPages]);


    const showToast = (message, type) => {
        alert(`${type.toUpperCase()}: ${message}`);
    };
                // Add to cart
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

// Remove from cart
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

// Toggle button
const handleToggleCart = (productId, price) => {
    if (cartProductIds.has(productId)) {
        removeFromCart(productId);
    } else {
        addToCart(productId, price);
    }
};

    return (
        <div className="container">
            <div className="search-filter-container">

            <input
            className="search-bar"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCategory("");
                    setPage(0);
                }}
            />

            <select
            className="categroy-dropdown"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    setSearchTerm("");
                    setPage(0);
                }}
            >
                <option value="">All Categories</option>
                {Object.entries(categoryMapping).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
            </div>
           

            <div className="product-gallery">
                {searchTerm || category ? (
                    products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.product_id} className="product-card" onClick={() => navigate(`/product-detail/${product.product_id}`)}>
                                
                                <img src={`http://localhost:8080${product.imageUrl}`} alt={product.productName} className="product-image" loading="lazy" />
                                <h3>{product.productName}</h3>
                                <p className="product-description">{product.product_description}</p>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                                <p className="category-name">Category: {product.categoryName}</p>
                                <button className="atcart"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    handleToggleCart(product.product_id,product.price);
                                }}>
                                     {cartProductIds.has(product.product_id) ? "Remove" : "Add"}
                                </button>
                            </div>
                        ))
                    )
                ) : (
                    Object.keys(groupedProducts).length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        Object.keys(groupedProducts).map((cat) => (
                            <div key={cat}>
                                <div className="category-group">
                                    {groupedProducts[cat].map((product) => (
                                        <div key={product.product_id} className="product-card" onClick={() => navigate(`/product-detail/${product.product_id}`)}>
                                            
                                            <img src={product.imageUrl} alt={product.productName} className="product-image" loading="lazy" />
                                            <h3>{product.productName}</h3>
                                            <p className="product-description">{product.product_description}</p>
                                            <p className="product-price">${product.price.toFixed(2)}</p>
                                            <p className="category-name">Category: {product.categoryName}</p>
                                            <button className="atcart"
                                             onClick={(e)=>{
                                             e.stopPropagation();
                                             handleToggleCart(product.product_id,product.price);
                                             }}>
                                             {cartProductIds.has(product.product_id) ? "Remove" : "Add"}
                                             </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>

            <div ref={observerRef} style={{ height: '20px', backgroundColor: 'transparent' }}></div>

            {(searchTerm || category) && (
                <div className="pagination">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>Previous</button>
                    <span> Page {page + 1} of {totalPages} </span>
                    <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page >= totalPages - 1}>Next</button>
                </div>
            )}
        </div>
    );
}

export default ProductGallery;