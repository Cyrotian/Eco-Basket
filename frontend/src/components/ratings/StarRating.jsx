import React from "react";
import PropTypes from 'prop-types';  // Import PropTypes

const StarRating = ({ rating, setRating }) => {
    return (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <span 
                    key={star} 
                    style={{ fontSize: "24px", cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
                    onClick={() => setRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

// Add PropTypes validation for rating and setRating props
StarRating.propTypes = {
    rating: PropTypes.number.isRequired,  // Ensuring rating is a required number
    setRating: PropTypes.func.isRequired,  // Ensuring setRating is a required function
};

export default StarRating;
