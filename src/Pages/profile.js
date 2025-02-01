import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId)
        .then((response) => setUserProfile(response.data))
        .catch(() => setUserProfile(null));
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-page-container">
      <div className="jumbotron">
        <h1 className="profile-heading">Welcome to Your Profile, {username}!</h1>
        <p className="profile-subtitle">
          Explore your personal details and view your flight booking information.
        </p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Personal Details</h2>
          {userProfile ? (
            <>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Phone:</strong> {userProfile.phone}</p>
              <p><strong>Address:</strong> {userProfile.address}</p>
            </>
          ) : (
            <p>Loading your details...</p>
          )}
        </div>

        <div className="flight-booking-info">
          <h2>Your Flight Bookings</h2>
          <div className="flight-card">
            <p><strong>Flight Number:</strong> SE123</p>
            <p><strong>Departure:</strong> New Delhi, 10:00 AM</p>
            <p><strong>Arrival:</strong> Mumbai, 12:30 PM</p>
            <p><strong>Status:</strong> Confirmed</p>
          </div>

          <div className="flight-card">
            <p><strong>Flight Number:</strong> SE456</p>
            <p><strong>Departure:</strong> Bengaluru, 6:00 PM</p>
            <p><strong>Arrival:</strong> Hyderabad, 7:15 PM</p>
            <p><strong>Status:</strong> Pending Confirmation</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
