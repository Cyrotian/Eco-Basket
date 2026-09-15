import React from "react";
import PropTypes from 'prop-types';  // Import PropTypes

const DeleteConfirmationModal = ({ product, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/products/${product.productId}`, { method: "DELETE" });
      onDelete(); // Refresh product list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete {product.productName}?</h3>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

// Add PropTypes validation
DeleteConfirmationModal.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
