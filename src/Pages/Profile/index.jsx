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
      //console.log(response.data);

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
    <div>
      <h1>Hello {user.name}, this is your profile page</h1>
      <div>
        <p>{user.userType}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      {/*       {user && (
        <div>
          <p>USER: Name: {user.name}</p>
          <p>USER: Email: {user.email}</p>
          <p>USER: UserType: {user.userType}</p>
        </div>
      )}
      {manager && (
        <div>
          <p>MANAGER: Name: {user.name}</p>
          <p>MANAGER: Email: {user.email}</p>
          <p>MANAGER: UserType: {user.userType}</p>
        </div>
      )} */}
    </div>
  );
}

export default ProfilePage;
