import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:5005";

const KennelPage = ({ category }) => {
  const [kennels, setKennels] = useState([]);

  useEffect(() => {
    console.log(`Fetching kennels for category: ${category}`);
    // Fetch kennel data from the backend
    axios.get(`${API_BASE_URL}/api/kennels`) // Update the URL here
      .then((response) => {
        console.log("Kennel data response:", response.data);
        setKennels(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${category}:`, error);
      });
  }, [category]);
  

  return (
    <div className="kennel-page">
      <video
        autoPlay loop muted style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          zIndex: -1,
        }}
      >
        <source
          src="https://player.vimeo.com/external/205354774.sd.mp4?s=90ac603808b7b7ae0d1ca644afee9f53f0bc19b0&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <h2>Kennels</h2>
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
