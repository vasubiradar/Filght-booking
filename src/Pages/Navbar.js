import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUsername("");
    navigate("/");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <nav className="navbar">
      {/* Left Side - Airplane Logo & Brand Name */}
      <div className="nav-logo">
        <img
          src="https://media.istockphoto.com/id/1258141375/vector/plane-travel-icon-air-travel-around-the-world-flying-around-the-world-travel-agency-logo.jpg?s=612x612&w=0&k=20&c=QaZk5NDYsdfKd_7iUNAe3CImkcwlzyaibpMuYIteeWY="
          alt="Airplane Logo"
          className="airplane-logo"
        />
        <span className="college-name">SufarEasy</span>
      </div>

      {/* Right Side - Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/generate-id-card" className="nav-item">All Flights</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact Us</Link>

        {isAuthenticated ? (
          <>
            <div className="profile-section">
              <span className="profile-username">{username}</span>
              <Link to={`/profile/${userId}`} className="profile-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" alt="Profile" className="profile-image" />
              </Link>
            </div>
            <button onClick={handleLogout} className="nav-item login-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-item login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
