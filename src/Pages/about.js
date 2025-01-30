import React from 'react';
import './about.css'; // Your CSS file

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <div className="header-overlay">
          <h1>About Our Flight Booking Platform</h1>
          <p>Your gateway to a seamless journey across the skies!</p>
        </div>
      </header>

      {/* Jumbotron Section */}
      <section className="jumbotron">
        <h2>Popular Destinations</h2>
        <div className="destination-container">
          {/* Goa Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Goa" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Goa</h3>
              <p>A beautiful destination for beaches and vibrant nightlife.</p>
            </div>
          </div>

          {/* Manali Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/2407751/pexels-photo-2407751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Manali" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Manali</h3>
              <p>Experience the snow-capped mountains and adventurous activities.</p>
            </div>
          </div>

          {/* Kerala Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/3633950/pexels-photo-3633950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Kerala" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Kerala</h3>
              <p>Enjoy the serene backwaters and scenic beauty of Kerala.</p>
            </div>
          </div>

          {/* Jaipur Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/2613015/pexels-photo-2613015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Jaipur" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Jaipur</h3>
              <p>Discover the royal culture and historic forts of Rajasthan.</p>
            </div>
          </div>

          {/* Ladakh Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/1539700/pexels-photo-1539700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Ladakh" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Ladakh</h3>
              <p>An adventure lover’s dream with stunning landscapes and high-altitude trekking.</p>
            </div>
          </div>

          {/* Andaman Destination */}
          <div className="destination-card">
            <img 
              src="https://images.pexels.com/photos/19736837/pexels-photo-19736837/free-photo-of-road-in-jungle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Andaman" 
              className="destination-image" 
            />
            <div className="destination-info">
              <h3>Andaman</h3>
              <p>Explore pristine beaches, crystal-clear waters, and vibrant coral reefs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>Contact Us: info@flightbooking.com</p>
      </footer>
    </div>
  );
};

export default About;
