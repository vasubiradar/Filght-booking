import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "./UserService";
import "./profile.css"; // Custom CSS for profile styling

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUserById(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>{user.username}'s Profile</h2>
      <div className="profile-image">
        <img src={user.profilePic} alt="Profile" />
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>

      {/* About Section */}
      <div className="profile-about">
        <h3>About {user.username}</h3>
        <p>{user.about || "This user has not shared much about themselves yet."}</p>
      </div>

      {/* Safety Tips Section */}
      <div className="profile-safety">
        <h3>Safety Tips</h3>
        <ul>
          <li>Keep your personal information private and secure.</li>
          <li>Always verify requests before sharing sensitive data.</li>
          <li>Enable two-factor authentication (2FA) for your accounts.</li>
        </ul>
      </div>

      <button className="profile-button">Edit Profile</button>
    </div>
  );
};

export default Profile;
