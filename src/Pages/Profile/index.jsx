import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [user, setUser] = useState(false);
  const [manager, setManager] = useState(false);

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setUser(response.data);

      if (response.data.userType === "user") {
        setUser(true);
      } else {
        setManager(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Hello {user.name}, this is your profile page</h1>
      <div className="profile-info">
        <p className="profile-item">Title: {user.userType}</p>
        <p className="profile-item">Name: {user.name}</p>
        <p className="profile-item">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
