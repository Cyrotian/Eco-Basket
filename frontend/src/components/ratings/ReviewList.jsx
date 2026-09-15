import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';  

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!productId) return; // Prevents making an invalid API call

        axios.get(`http://localhost:8080/api/ratings/${productId}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error("Error fetching reviews:", error));
    }, [productId]);

    if (!productId) {
        return <p>Loading reviews...</p>;     // Prevents rendering with undefined productId
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Reviews:</h3>
            {reviews.length === 0 ? <p>No reviews yet.</p> : (
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
                            <strong>User {review.userId}</strong> - {review.rating}⭐
                            <p>{review.review}</p>
                            <small>{new Date(review.createdAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// To ensure productId is required
ReviewList.propTypes = {
    productId: PropTypes.number,  
};

export default ReviewList;
