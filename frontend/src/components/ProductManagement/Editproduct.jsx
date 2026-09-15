import React, { useState } from "react";
import PropTypes from 'prop-types';  // Import PropTypes

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/products/${product.productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onUpdate(); // Refresh product list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          <input type="text" name="imageLink" value={formData.imageLink} onChange={handleChange} required />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
EditProductModal.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProductModal;
