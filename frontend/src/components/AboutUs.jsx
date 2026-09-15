import React from "react";
import "./css/about.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-intro">
        <h1>About Eco Basket</h1>
        <p>
          Eco Basket is more than just an e-commerce platform—it&apos;s a movement towards a 
          <strong> sustainable future</strong>. Our goal is to bridge the gap between farmers and consumers 
          by ensuring <strong> genuine organic produce</strong>, fair pricing, and 
          <strong> education on sustainable farming practices</strong>.
        </p>
      </section>

      <section className="problem">
        <h2 className="titles">The Problem We Are Solving</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="icon">🚫</span>
            <div>
              <h3>Decline of Genuine Organic Produce</h3>
              <p>Up to <strong>40%</strong> of &quot;organic&quot; products contain banned pesticides due to poor regulation.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">💰</span>
            <div>
              <h3>Struggles for Small-Scale Farmers</h3>
              <p>Farmers receive <strong>less than 15%</strong> of the consumer dollar due to middlemen.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">❓</span>
            <div>
              <h3>Consumer Distrust</h3>
              <p>More than <strong>60%</strong> of consumers distrust large-scale organic labels.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">🍽️</span>
            <div>
              <h3>Food Insecurity</h3>
              <p>About <strong>821 million people</strong> lack access to fresh, nutritious food.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">📉</span>
            <div>
              <h3>Loss of Agricultural Knowledge</h3>
              <p>Urbanization has reduced farming awareness, leading to unsustainable alternatives.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <h2 className="titles">Our Mission</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="icon">🌍</span>
            <div>
              <h3>Empowering Small-Scale Farmers</h3>
              <p>We aim to support farmers by providing a trusted marketplace and fair prices.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">📚</span>
            <div>
              <h3>Educating Consumers</h3>
              <p>We believe in educating consumers about sustainable farming practices.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">🤝</span>
            <div>
              <h3>Responsible Consumption</h3>
              <p>We promote conscious consumer behavior that supports sustainability.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">🔍</span>
            <div>
              <h3>Transparency in Food Sourcing</h3>
              <p>We ensure transparency so consumers know where their food comes from.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">🌱</span>
            <div>
              <h3>Improving Food Security</h3>
              <p>We focus on increasing access to fresh, nutritious food in underserved regions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <h2 className="titles">Who We Are</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="icon">👩‍🌾</span>
            <div>
              <h3>Eco-Conscious Entrepreneurs</h3>
              <p>We are a team of entrepreneurs dedicated to sustainable living and green solutions.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">🌾</span>
            <div>
              <h3>Agricultural Experts</h3>
              <p>Our team brings agricultural expertise to promote responsible farming practices.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">💻</span>
            <div>
              <h3>Technology Innovators</h3>
              <p>We leverage technology to bridge the gap between farmers and consumers.</p>
            </div>
          </div>

          <div className="problem-card">
            <span className="icon">📈</span>
            <div>
              <h3>Business Leaders</h3>
              <p>Our business leaders ensure that Eco Basket operates efficiently and effectively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2 className="titles">Join Us in Making a Difference</h2>
        <p>
          Be part of the <strong>organic revolution</strong>. Whether you&apos;re a 
          <strong> farmer</strong>, a <strong>consumer</strong>, or someone looking to learn more 
          about sustainable farming, <strong>Eco Basket is here for you</strong>.
        </p>
        <Link to="/login">
          <button>Join Us today</button>
        </Link>
      </section>
    </div>
  );
};

export default About;
