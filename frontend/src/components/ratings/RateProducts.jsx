import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import ReviewList from "./ReviewList";

const RateProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    // Fetch all products from backend
    useEffect(() => {
        axios.get("http://localhost:8080/api/products") // Adjust endpoint if needed
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Handle rating submission
    const submitRating = async () => {
        if (!selectedProduct || rating === 0) {
            alert("Please select a product and give a rating!");
            return;
        }

        const ratingData = {
            productId: selectedProduct?.productId, // Ensure consistency with backend naming
            userId: 1, // Placeholder, replace with actual logged-in user ID
            rating: rating,
            review: review,
        };

        try {
            await axios.post("http://localhost:8080/api/ratings/submit", ratingData);
            alert("Rating submitted successfully!");
            setReview("");
            setRating(0);
            setSelectedProduct({ ...selectedProduct }); // Force re-render to update review list
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Rate A Product!</h1>
            <h2 style={{ textAlign: "left", marginLeft: "20px" }}>Products:</h2>

            <ul>
                {products.map(product => (
                    <li key={product.productId} 
                        onClick={() => setSelectedProduct(product)} 
                        style={{ cursor: "pointer", marginBottom: "10px" }}>
                        {product.name} 
                    </li>
                ))}
            </ul>

            {selectedProduct && (
                <div>
                    <h3>Rate: {selectedProduct.name}</h3>
                    <StarRating rating={rating} setRating={setRating} />
                    <textarea 
                        placeholder="Write a review..." 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)}
                        rows="3" 
                        style={{ width: "100%", marginTop: "10px" }} 
                    />
                    <button onClick={submitRating} style={{ marginTop: "10px" }}>Submit Review</button>

                    <ReviewList productId={selectedProduct?.productId} />
                </div>
            )}
        </div>
    );
};

export default RateProducts;
