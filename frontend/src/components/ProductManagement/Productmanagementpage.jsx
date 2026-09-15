import React, { useEffect, useState } from "react";
import EditProductModal from "./Editproduct";
import DeleteConfirmationModal from "./Deleteproduct";
import './Productmanagementstyel.css';  



const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace fetchProducts with mock data for testing
  useEffect(() => {
    // Mock data for testing
    const mockData = [
      { productId: 1, productName: 'Product 1', category: 'Category 1', imageLink: '/path/to/image1.jpg' },
      { productId: 2, productName: 'Product 2', category: 'Category 2', imageLink: '/path/to/image2.jpg' },
      { productId: 3, productName: 'Product 3', category: 'Category 3', imageLink: '/path/to/image3.jpg' },
    ];

    // Set mock data into products state
    setProducts(mockData);
  }, []);

  // Open Edit Modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  // Open Delete Confirmation Modal
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>
                  <img src={product.imageLink} alt={product.productName} width="50" />
                </td>
                <td>
                  <button className="btn btn-primary mx-2" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && <EditProductModal product={selectedProduct} onClose={() => setShowEditModal(false)} onUpdate={() => {}} />}
      {showDeleteModal && <DeleteConfirmationModal product={selectedProduct} onClose={() => setShowDeleteModal(false)} onDelete={() => {}} />}
    </div>
  );
};

export default ProductManagement;