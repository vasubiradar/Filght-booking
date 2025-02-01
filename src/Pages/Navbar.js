import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setUsername(localStorage.getItem("username"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img
          src="https://media.istockphoto.com/id/1258141375/vector/plane-travel-icon-air-travel-around-the-world-flying-around-the-world-travel-agency-logo.jpg?s=612x612&w=0&k=20&c=QaZk5NDYsdfKd_7iUNAe3CImkcwlzyaibpMuYIteeWY="
          alt="Airplane Logo"
          className="airplane-logo"
        />
        <span className="college-name">SufarEasy</span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/allflight" className="nav-item">All Flights</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact Us</Link>

        {isAuthenticated ? (
          <>
            {/* Profile Section */}
            <div className="profile-section">
              {/* <span className="profile-username">Welcome, {username}</span> */}
              <Link to={`/profile/${userId}`} className="nav-item profile-btn">
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-item logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          // Show Login button if not authenticated
          <Link to="/login" className="nav-item login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
