import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/orderhistory.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    axios.get("http://localhost:8080/orders/history", {
      params: { userId },
    })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching order history", err);
        setError("Failed to load order history");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="dashboard-loading">Loading order history...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!orders.length) return <div className="dashboard-empty">You have no orders yet.</div>;

  return (
<div className="dashboard-container">
  <h1>Your Order History</h1>

  <div className="dashboard-scroll-wrapper">
    <div className="dashboard-grid">
      {orders.map(order => (
        <div key={order.orderId} className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>Order #{order.orderId}</h3>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> £{order.totalValue}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Shipping:</strong> {order.shippingAddress}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};
export default OrderHistoryPage;