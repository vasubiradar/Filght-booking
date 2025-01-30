import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState("");  // To store the username
  const [userId, setUserId] = useState(localStorage.getItem("userId"));  // Store user ID from local storage

  useEffect(() => {
    // Ensure authentication status is correctly set when component mounts
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");

    // Fetch username from localStorage after login
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    // Update state and redirect
    setIsAuthenticated(false);
    setUsername("");  // Clear the username
    navigate("/");

    // Refresh once after logout to update UI
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <nav className="navbar">
      {/* Left Side - Logo & College Name */}
      <div className="nav-logo">
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
            {/* Display the profile icon and username */}
            <div className="profile-section">
              <span className="profile-username">{username}</span>
              <Link to={`/profile/${userId}`} className="profile-icon">
                <img src="path/to/profile-icon.png" alt="Profile" className="profile-image" />
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
