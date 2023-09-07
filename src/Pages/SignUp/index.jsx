import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://dog-whisperer.onrender.com";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, email, password, userType };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signUp-page">
      <video
        autoPlay
        muted
        loop
        className="background-video-signup"
        preload="auto"
      >
        <source
          src="https://player.vimeo.com/external/325793715.sd.mp4?s=30a8fc34cd7dfc09a3c06651d9325c015cbfd3d8&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="signUp-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>

          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>

          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          <div>
            <label htmlFor="userType">User Type:</label>
          </div>
          <div className="user-type">
            <input
              type="radio"
              label="User"
              value="User"
              name="userType"
              onClick={handleUserType}
            />
            <label htmlFor="user" style={{ marginTop: 14 }}>
              User
            </label>
            <div style={{ width: 20 }}></div>
            <input
              type="radio"
              label="Manager"
              value="Manager"
              name="userType"
              onClick={handleUserType}
            />
            <label htmlFor="manager" style={{ marginTop: 14 }}>
              Manager
            </label>
          </div>

          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUpPage;
