import React, { useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes explicitly

const Media = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div>
      <h3>Upload Product Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

// ✅ Explicit PropTypes validation clearly defined
Media.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default Media;
