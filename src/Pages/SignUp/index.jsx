import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  // Default is false
  /*     const [isKennelsManager, setIsKennelsManager] = useState(false); */

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent default actions
    e.preventDefault();

    // create our request body object
    const requestBody = { name, email, password, userType };

    // we send these infos to Backend
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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

        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>

        {/*         <label>
          <input
            type="checkbox"
                        checked={isKennelsManager}
            onChange={(e) => setIsKennelsManager(e.target.checked)}
            onClick={handleUserType}
          />
          Are you a kennel manager?
        </label> */}

        <div>
          <label htmlFor="userType">User Type</label>
        </div>
        <div>
          <input
            type="radio"
            label="User"
            value="User"
            name="userType"
            onClick={handleUserType}
          />
          <label htmlFor="user">User</label>

          <input
            type="radio"
            label="Manager"
            value="Manager"
            name="userType"
            onClick={handleUserType}
          />
          <label htmlFor="manager">Manager</label>
        </div>

        <button type="submit">Sign Up</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
