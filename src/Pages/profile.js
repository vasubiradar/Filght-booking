import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "./UserService";
import "./profile.css";  // Assuming you have a CSS file for styling the profile page

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details based on the userId from URL params
    UserService.getUserById(userId).then((response) => {
      setUser(response.data);
    }).catch((error) => {
      console.error("Error fetching user profile", error);
    });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>{user.username}'s Profile</h2>
      <img src={user.profilePic} alt="Profile" className="profile-img" />
      <p>Email: {user.email}</p>
      {/* Add other profile information here */}
    </div>
  );
};

export default Profile;
