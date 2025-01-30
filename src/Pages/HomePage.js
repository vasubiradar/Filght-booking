import React from "react";
import "./HomePage.css";


const HomePage = () => {
  const flightCoupons = [
    "https://via.placeholder.com/300x150?text=Flight+Coupon+1",
    "https://via.placeholder.com/300x150?text=Flight+Coupon+2",
    "https://via.placeholder.com/300x150?text=Flight+Coupon+3",
  ];

  return (
    <div className="homepage-container">
      {/* Navbar with Flight Booking Logo */}
      <nav className="navbar">
        {/* <div className="navbar-logo">
          <img src="https://via.placeholder.com/150x50?text=Flight+Logo" alt="Flight Booking Logo" />
        </div> */}
      </nav>

      {/* Full Screen Video Section */}
      <section className="video-section">
        <video className="full-video" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Flight Coupons Section */}
      <section className="flight-coupons-section">
        <h2 className="coupons-title">Special Flight Coupons</h2>
        <div className="coupons-container">
          {flightCoupons.map((coupon, index) => (
            <div className="coupon-card" key={index}>
              <img src={coupon} alt={`Coupon ${index + 1}`} className="coupon-img" />
            </div>
          ))}
        </div>
      </section>

      {/* Information Cards */}
      <section className="info-section">
        <div className="info-card">
          <h3>📄 Book a Flight</h3>
          <p>Book your flight with ease through our platform.</p>
        </div>
        <div className="info-card">
          <h3>✅ Confirm Your Ticket</h3>
          <p>Once you choose your flight, we confirm your ticket instantly.</p>
        </div>
        <div className="info-card">
          <h3>📥 Download Your Ticket</h3>
          <p>Download your e-ticket and be ready for your flight journey.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
