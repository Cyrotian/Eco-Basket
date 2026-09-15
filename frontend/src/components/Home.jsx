import React from 'react';
import { Link } from "react-router-dom";
import "./css/home.css";
import FoodProducts from "../assets/images/FoodProducts.jpg";
import Home_seed from "../assets/images/Home_seed.jpg";
import background from "../assets/images/background.jpg";
import SharingFood from "../assets/images/SharingFood.jpg";
import Fresh_prod from "../assets/images/Fresh_prod.jpg";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { img: background, title: '' },
  { img: Home_seed, title: '' },
  { img: FoodProducts, title: '' },
  { img: SharingFood, title: '' },
  { img: Fresh_prod, title: '' },
  
];

const Home = () => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px'
        }
      }
    ]
  };

  return (
    <div className="homepage-grid">
      {/* Section 1: Introduction */}
      <section className="intro">
        <h1>Welcome to Eco Basket</h1>
        <p>
          Eco Basket is your one-stop platform for organic shopping and learning. 
          We connect consumers directly with organic farmers while offering educational 
          resources on sustainable farming practices.
        </p>
        <Link to="/about-us">
          <button>Learn More</button>
        </Link>
      </section>

      {/* Section 2: Features & How We Help */}
      <section className="features">
        <h2 className='title'>How We Help</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Direct Farmer Marketplace</h3>
            <p>Buy fresh organic produce directly from farmers, ensuring authenticity and fair pricing.</p>
          </div>
          <div className="feature">
            <h3>E-Learning Platform</h3>
            <p>Learn how to grow your own crops with expert guides and tutorials.</p>
          </div>
          <div className="feature">
            <h3>Sustainable Shopping</h3>
            <p>Purchase eco-friendly farming tools, seeds, and supplies while supporting sustainable practices.</p>
          </div>
        </div>
        <Link to="/explore">
          <button>Explore Features</button>
        </Link>
      </section>

      {/* Section 3: Products & SDGs */}
      <section className="products text-center p-6">
        <h2 className='title'>Our Organic Products</h2>
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="p-4">
              <div className="bg-white shadow-lg rounded-xl p-4 transform transition-transform hover:scale-105">
                <img src={product.img} alt={product.title} className="w-full h-40 object-cover rounded-lg mx-auto" style={{ objectFit: 'cover', maxHeight: '200px' }} />
                <p className="mt-3 text-lg font-semibold">{product.title}</p>
              </div>
            </div>
          ))}
        </Slider>
        <Link to="/product-gallery">
          <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Shop Now</button>
        </Link>
      </section>

      {/* SDGs Section */}
      <section className='SDG-section'>
        <h2 className='title'>Our Commitment to Sustainability</h2>
        <ul className="sdgs">
          <li>🌱 SDG 2: Zero Hunger - Supporting sustainable food production.</li>
          <li>📚 SDG 4: Quality Education - Educating consumers and farmers.</li>
          <li>♻️ SDG 12: Responsible Consumption - Promoting sustainable farming.</li>
          <li>💼 SDG 8: Decent Work - Empowering farmers and fair trade.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;