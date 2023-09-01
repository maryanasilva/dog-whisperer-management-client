import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import SignUpPage from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import React from "react";
import ProfilePage from "./Pages/Profile";
import IsAnon from "./Components/IsAnon";
import IsPrivate from "./Components/IsPrivate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
