import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Inventory.css';

const InventoryTracker = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateQty, setUpdateQty] = useState({});

  const sellerId = localStorage.getItem('SellerId');

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/inventory?sellerId=${sellerId}`);
      setInventory(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleQuantityChange = (productId, value) => {
    setUpdateQty(prev => ({ ...prev, [productId]: value }));
  };

  const handleIncreaseInventory = async (productId) => {
    const increaseAmount = parseInt(updateQty[productId], 10);
    if (isNaN(increaseAmount) || increaseAmount <= 0) return;
    
    try {
      await axios.patch(`http://localhost:8080/api/product/${productId}/increasestock`, null, {
        params: { quantity: increaseAmount }
      });
      fetchInventory();
      setUpdateQty(prev => ({ ...prev, [productId]: '' }));
    } catch (err) {
      console.error('Error updating inventory', err);
    }
  };

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="inventory-tracker">
      <h2>Inventory</h2>
      {inventory.length === 0 ? (
        <p>No products found in your inventory.</p>
      ) : (
        <div className="inventory-grid">
          {inventory.map(product => (
            <div key={product.productId} className="inventory-card">
              <h3>{product.productName}</h3>
              <p className="price">${product.price}</p>
              <p className="quantity">Total Units: {product.quantity}</p>
              <div className="update-section">
                <input
                  type="number"
                  min="1"
                  placeholder="Increase by"
                  value={updateQty[product.productId] || ''}
                  onChange={e => handleQuantityChange(product.productId, e.target.value)}
                />
                <button onClick={() => handleIncreaseInventory(product.productId)}>
                  Increase
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryTracker;
