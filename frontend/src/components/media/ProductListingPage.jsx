import React, { useState } from 'react';
import Media from './mediaUpload';  // Import the Media component from mediaUpload.js
const ProductListingPage = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // State to hold image file

  // Handle the image upload (callback passed to MediaUpload)
  const handleImageUpload = (file) => {
    setImage(file); // Store the selected image in the state
  };

  // Form submission (sending data to backend)
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    if (!productName || !category || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,  // Send the data (including image) to the backend
      });

      const result = await response.json();
      if (result.success) {
        alert('Product created successfully');
      } else {
        alert('Error creating product');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div>
      <h1>Product Listing Page</h1>
      <form onSubmit={handleProductSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        {/* Add MediaUpload component */}
        <Media onImageUpload={handleImageUpload} />

        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default ProductListingPage;
