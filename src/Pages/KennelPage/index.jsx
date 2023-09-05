import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddKennel from "../AddKennel";

const API_URL = "http://localhost:5005";

const KennelPage = ({ category }) => {
  const [kennels, setKennels] = useState([]);
  const [showAddKennelForm, setShowAddKennelForm] = useState(false);

  useEffect(() => {
    console.log(`Fetching kennels for category: ${category}`);
    // Fetch kennel data from the backend
    axios
      .get(`${API_URL}/api/kennels`)
      .then((response) => {
        console.log("Kennel data response:", response.data);
        setKennels(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${category}:`, error);
      });
  }, [category]);

  const handleKennelAdded = (newKennel) => {
    // Add the newly created kennel to the kennels list
    setKennels([...kennels, newKennel]);
    // Hide the Add Kennel form
    setShowAddKennelForm(false);
  };

  return (
    <div className="kennel-page">
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          zIndex: -1,
        }}
        src="https://player.vimeo.com/external/403883843.sd.mp4?s=fd15faff528e81dbb134e5ae16098c6d767ebd60&profile_id=164&oauth2_token_id=57447761"
      ></video>

      <h2>Kennels</h2>

      <button onClick={() => setShowAddKennelForm(!showAddKennelForm)}>
        {showAddKennelForm ? "Hide Add Kennel Form" : "Add Kennel"}
      </button>

      {/* Conditionally render the AddKennel component */}
      {showAddKennelForm && <AddKennel onKennelAdded={handleKennelAdded} />}

      <div className="kennel-cards">
        {kennels.map((kennel) => (
          <div key={kennel._id} className="kennel-card">
            <img src={kennel.image} alt={kennel.name} />
            <h3>Name: {kennel.name}</h3>
            <p>A little description: {kennel.description}</p>
            <Link to={`/dogs/${kennel._id}`}>Dogs</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KennelPage;
