import React from "react";
import "./HomePage.css";
import video from "./video.mp4"; // Import the video from the specified location

const HomePage = () => {
  const flightCoupons = [
    "https://www.ixigo.com/offers/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2Fa43885c962d56183e7e22fbafcc0c773-uijjx.png&w=828&q=75",
    "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575355495/flight-offers.jpg",
    "https://www.shopickr.com/wp-content/uploads/2016/07/paytm-flyday-sale-cashback-on-flight-tickets-cheap-air-bookings.jpg",
  ];

  return (
    <div className="homepage-container">
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
