import React from "react";
import { Link } from "react-router-dom";
import "./css/explore.css";
import Fresh_prod from "../assets/images/Fresh_prod.jpg";
import FoodProducts from "../assets/images/FoodProducts.jpg";
import Home_seed from "../assets/images/Home_seed.jpg";

const farmers = [
  { name: "John Doe", image: "/images/farmer-john.jpg", description: "A second-generation organic farmer dedicated to sustainable agriculture." },
  { name: "Lisa Green", image: "/images/farmer-lisa.jpg", description: "Advocate for regenerative farming and community-supported agriculture." },
];

const Explore = () => {
  return (
    <div className="explore-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Discover the World of Organic Living</h1>
        <p>Explore sustainable products, learn about organic farming, and connect with farmers making a difference.</p>
        <div className="cta-button">
          <Link to="/product-gallery">Start Exploring</Link>
        </div>
      </section>

      {/* 🛒 Organic Products - Clickable */}
      <Link to="/product-gallery" className="organic-products">
        <section>
          <h2 className="title">🌿 Explore Our Fresh Organic Products</h2>
          <p>From farm-fresh vegetables to wholesome dairy and grains, we bring you the best from nature.</p>
          <div className="product-container">
            <div className="product-card">
              <img src={Fresh_prod} alt="Organic Vegetables" />
              <div className="product-info">
                <h3>🥦 Fresh Vegetables</h3>
                <p>Pesticide-free, naturally grown greens.</p>
              </div>
            </div>
            <div className="product-card">
              <img src={FoodProducts} alt="Organic Dairy" />
              <div className="product-info">
                <h3>🥛 Organic Dairy</h3>
                <p>Hormone-free milk, cheese, and butter.</p>
              </div>
            </div>
            <div className="product-card">
              <img src={Home_seed} alt="Organic Grains" />
              <div className="product-info">
                <h3>🌾 Whole Grains</h3>
                <p>Nutrient-rich and grown without chemicals.</p>
              </div>
            </div>
            <div className="product-card">
              <img src={Home_seed} alt="Organic Grains" />
              <div className="product-info">
                <h3>🌾 Whole Grains</h3>
                <p>Nutrient-rich and grown without chemicals.</p>
              </div>
            </div>
            <div className="product-card">
              <img src={Home_seed} alt="Organic Grains" />
              <div className="product-info">
                <h3>🌾 Whole Grains</h3>
                <p>Nutrient-rich and grown without chemicals.</p>
              </div>
            </div>
            <div className="product-card">
              <img src={Home_seed} alt="Organic Grains" />
              <div className="product-info">
                <h3>🌾 Whole Grains</h3>
                <p>Nutrient-rich and grown without chemicals.</p>
              </div>
            </div>
          </div>
        </section>
      </Link>

      {/* 👨‍🌾 Meet the Farmers */}
      <section className="meet-farmers">
        <h2 className="title">👨‍🌾 Meet Our Farmers</h2>
        <p>Get to know the passionate individuals growing your food.</p>
        <div className="farmer-grid">
          {farmers.map((farmer, index) => (
            <div key={index} className="farmer-card">
              <img src={farmer.image} alt={farmer.name} />
              <h3>{farmer.name}</h3>
              <p>{farmer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌎 Call-to-Action */}
      <section className="cta">
        <h2 className="title">Start Your Organic Journey Today!</h2>
        <div className="cta-button">
          <Link to="/product-gallery">Explore Products</Link>
        </div>
      </section>
    </div>
  );
};

export default Explore;
