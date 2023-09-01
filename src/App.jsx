import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import SignUpPage from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import React from "react";
import ManagerPage from "./Pages/Manager";
import UserPage from "./Pages/User";
import IsAnon from "./Components/IsAnon";
import IsPrivate from "./Components/IsPrivate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/manager"
          element={
            <IsPrivate>
              <ManagerPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user"
          element={
            <IsPrivate>
              <UserPage />
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
