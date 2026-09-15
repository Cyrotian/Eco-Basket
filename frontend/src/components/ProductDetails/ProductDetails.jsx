import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetail.css";

const ProductForm = () => {
    // State to manage categories, product details, image preview, and form blur effect
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        sellerId: "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isFormBlurred, setIsFormBlurred] = useState(false);

    // Fetch the sellerId from localStorage on component mount
    useEffect(() => {
        const storedSellerId = localStorage.getItem("SellerId");
        if (storedSellerId) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                sellerId: storedSellerId,
            }));
        } else {
            console.error("No sellerId found in localStorage");
        }
    }, []);

    // Fetch the categories from the backend when the component mounts
    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then(response => {
                setCategories(response.data);
                console.log("Categories fetched successfully:", response.data);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Handle image file change and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission to create a new product
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure sellerId exists before submitting
        if (!product.sellerId) {
            console.error("No sellerId found, cannot submit product.");
            return;
        }

        const productData = {
            productName: product.name,
            price: product.price,
            product_description: product.description,
            category: { id: product.categoryId },
            seller_id: Number(product.sellerId),
        };

        // Create the product by sending a POST request to the backend
        axios.post("http://localhost:8080/api/products", productData)
            .then(response => {
                const createdProduct = response.data;
                const productId = createdProduct.product_id;

                // Check if the productId is valid
                if (isNaN(productId)) {
                    console.error("Invalid productId:", productId);
                    return;
                }

                // If image is selected, upload it
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);

                    axios.post(`http://localhost:8080/api/images/upload/${productId}`, formData)
                        .then(imageResponse => {
                            if (imageResponse.data?.imageUrl) {
                                // Update product image URL in the state
                                setProduct((prevProduct) => ({
                                    ...prevProduct,
                                    imageUrl: imageResponse.data.imageUrl,
                                }));
                                showSuccessMessage();
                            } else {
                                showErrorMessage("Error uploading image.");
                            }
                        })
                        .catch(() => showErrorMessage("Error uploading image."));
                } else {
                    // Show success message if no image is uploaded
                    showSuccessMessage();
                }
            })
            .catch(() => showErrorMessage("Error creating product."));
    };

    // Show success popup and reset form after 3 seconds
    const showSuccessMessage = () => {
        setShowSuccessPopup(true);
        setIsFormBlurred(true);

        setTimeout(() => {
            setShowSuccessPopup(false);
            setIsFormBlurred(false);
            resetForm();
        }, 3000);
    };

    // Show error message in console
    const showErrorMessage = (message) => {
        console.error(message);
        setShowSuccessPopup(false);
        setIsFormBlurred(false);
    };

    // Reset the form to its initial state
    const resetForm = () => {
        setProduct({
            name: "",
            price: "",
            description: "",
            categoryId: "",
            sellerId: localStorage.getItem("SellerId") || "",
        });
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="product-detail-page">
            {/* Success popup shown after product creation */}
            {showSuccessPopup && (
                <div className="success-popup-top show">
                    <span className="icon">✅</span>
                    <div>Product created successfully!</div>
                </div>
            )}

            {/* Product creation form */}
            <div className={`product-detail-container ${isFormBlurred ? "blur" : ""}`}>
                <h2>Create Product</h2>

                <form onSubmit={handleSubmit}>
                    {/* Product Name Input */}
                    <div>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label>Category:</label>
                        <select
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product Image Input */}
                    <div>
                        <label>Product Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="Image Preview" />
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button type="submit">Create Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
