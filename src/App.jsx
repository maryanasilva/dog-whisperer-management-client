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
import KennelPage from "./Pages/KennelPage";
import AddKennel from "./Pages/AddKennel";
import DogPage from "./Pages/DogPage";
import AddDog from "./Pages/AddDog";
import EditDogPage from "./Pages/EditDog";

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
        <Route path="/kennels" element={<KennelPage category="kennels" />} />

        <Route
          path="/kennels/:kennelId/add-kennel"
          element={
            <IsPrivate>
              <AddKennel />
            </IsPrivate>
          }
        />

        <Route path="/dogs/:kennelId" element={<DogPage category="dogs" />} />

        <Route
          path="/kennels/:kennelId/add-dog"
          element={
            <IsPrivate>
              <AddDog />
            </IsPrivate>
          }
        />

        <Route
          path="/kennels/:kennelId/edit-dog/:dogId"
          element={<EditDogPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
