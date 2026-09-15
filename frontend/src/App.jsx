import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toasts and Global Notification Context
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./components/notification/NotificationContext";

// Layout
import Layout from "./components/layout/Layout";

// Home & Info Pages
import Home from "./components/Home";
import About from "./components/AboutUs.jsx";
import Explore from "./components/Explore.jsx";
import Help from "./components/Help";

// Authentication
import Registrationform from "./components/authpages/Registration.jsx";
import Login from "./components/Login";
import SellerRegistration from "./components/authpages/Seller_registration.jsx";

// User Profile & Dashboard
import Profile from "./components/userAccount/Profile.jsx";
import Notification from "./components/notification/Notification";
import SellerDashboard from "./components/userAccount/SellerDashboard.jsx";
import OrderHistoryPage from "./components/userAccount/OrderHistory.jsx";

// Product Viewing
import ProductGallery from "./components/marketplace/ProductGallery";
import ProductDetailPage from "./components/marketplace/ProductDetailPage.jsx";

// Product Management
import ProductManagement from "./components/ProductManagement/Productmanagementpage";
import ProductForm from "./components/ProductDetails/ProductDetails";
import ProductDetailsPage from "./components/ProductDetails/ProductDetails";
import EditProductModal from "./components/ProductManagement/Editproduct.jsx";
import DeleteConfirmationModal from "./components/ProductManagement/Deleteproduct.jsx";
import ProductListingPage from "./components/media/ProductListingPage";

// Cart & Checkout
import Cart from "./components/marketplace/Cart";
import Checkout from "./components/marketplace/Checkout";

// Learning & Blog
import OrganicFarmingInfo from "./components/e-Learning/OrganicFamingInfo";
import LearningHomePage from "./components/e-Learning/LearningHomePage.jsx";
import BlogDetailPage from "./components/e-Learning/BlogDetailPage.jsx";

// Messaging System
import MessagingSystem from "./components/messaging/MessagingSystem";
import ChatBubble from "./components/messaging/ChatBubble.jsx";
import MessageInput from "./components/messaging/MessageInput.jsx";

// Ratings
import RateProducts from "./components/ratings/RateProducts";
import ReviewList from "./components/ratings/ReviewList.jsx";
import StarRating from "./components/ratings/StarRating.jsx";

function App() {
  return (
    <NotificationProvider
      options={{
        position: "bottom-right",
        autoClose: 4000,
        toastStyle: {
          backgroundColor: "#ffffff",
          borderLeft: "5px solid #4CAF50",
          padding: "8px",
        },
        showToast: true,
      }}
    >
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home & Static Pages */}
            <Route index element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/help" element={<Help />} />

            {/* Authentication */}
            <Route path="/registration" element={<Registrationform />} />
            <Route path="/seller-registration" element={<SellerRegistration />} />
            <Route path="/login" element={<Login />} />

            {/* Profile & Notifications */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />

            {/* Product Viewing */}
            <Route path="/product-gallery" element={<ProductGallery />} />
            <Route path="/product-detail/:productId" element={<ProductDetailPage />} />

            {/* Product Management */}
            <Route path="/product-listing" element={<ProductListingPage />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/edit-product" element={<EditProductModal />} />
            <Route path="/delete-product" element={<DeleteConfirmationModal />} />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<Checkout />} />

            {/* Blog & Learning */}
            <Route path="/information" element={<OrganicFarmingInfo />} />
            <Route path="/learning" element={<LearningHomePage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />

            {/* Messaging */}
            <Route path="/messaging" element={<MessagingSystem />} />
            <Route path="/chat-bubble" element={<ChatBubble />} />
            <Route path="/message-input" element={<MessageInput />} />

            {/* Ratings */}
            <Route path="/rate-products" element={<RateProducts />} />
            <Route path="/review-list" element={<ReviewList />} />
            <Route path="/star-rating" element={<StarRating />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
