import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div>
          <h3>FlightBooking - Your Travel Partner</h3>
          <p>Seamlessly book flights with exclusive deals.</p>
          <p>Travel Across Destinations Hassle-Free.</p>
          <p>Founded: 2010</p>
        </div>
      </div>

      <div className="footer-links">
        <Link to="/about" className="footer-item">About Us</Link>
        <Link to="/contact" className="footer-item">Contact Us</Link>
        <Link to="/privacy" className="footer-item">Privacy Policy</Link>
        <Link to="/terms" className="footer-item">Terms & Conditions</Link>
      </div>

      <div className="footer-right">
        <p>Follow Us for Travel Updates:</p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
