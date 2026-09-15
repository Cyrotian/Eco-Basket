import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListingPage from '../media/ProductListingPage';
import '../css/dashboard.css';

const SellerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const sellerId = localStorage.getItem("userid");
        const response = await axios.get("http://localhost:8080/api/dashboard/seller", {
          params: { sellerId }
        });

        setDashboard(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Failed to load dashboard. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  
  if (loading) {
    return <div className="dashboard-loading">Loading seller dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  if (!dashboard) {
    return <div className="dashboard-empty">No dashboard data available.</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Your Seller Dashboard</h2>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card clickable">
          <strong>{dashboard.totalProducts}</strong>
          Total Products
        </div>
        <div className="dashboard-stat-card clickable">
          <strong>{dashboard.totalOrders}</strong>
          Total Orders
        </div>
        <div className="dashboard-stat-card clickable">
          <strong>£{Number(dashboard.totalRevenue).toFixed(2)}</strong>
          Total Revenue
        </div>
        <div className="dashboard-stat-card clickable">
          <strong>{dashboard.averageRating.toFixed(2)}</strong>
          Avg. Rating
        </div>
      </div>
      {showAddProduct && (
          ProductListingPage
      )}
    </div>
  );
};

export default SellerDashboard;
