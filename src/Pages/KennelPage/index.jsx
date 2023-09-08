import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const API_URL = "https://dog-whisperer.onrender.com";

const KennelPage = ({ category }) => {
  const [kennels, setKennels] = useState([]);
  const [showAddKennelForm, setShowAddKennelForm] = useState(false);

  const checkUser = async (e) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (response.data.userType === "Manager") {
        console.log("user type", response.data.userType);
        setShowAddKennelForm(true);
      } else {
        console.log("else:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

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

  return (
    <div className="kennel-page">
      <div className="kennels-image">
        <img src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.ibb.co%2FQbLtg8s%2Fkennels.png" alt="" className="dog-image" />
      </div>

      {showAddKennelForm && (
        <div>
          <Link to="/kennels/add-kennel">
            <Button className="button-add-kennel">Add Kennel</Button>
          </Link>
        </div>
      )}

      <div>
        <ul className="kennel-list">
          {kennels.map((kennel) => (
            <li key={kennel._id} className="kennel-item">
              <img
                src={kennel.image}
                alt={kennel.name}
                className="kennel-image"
              />
              <div className="kennel-details">
                <h3 className="kennel-name">{kennel.name}</h3>
                <p className="kennel-description">{kennel.description}</p>
                <p className="kennel-location">{kennel.location}</p>
                <div>
                  <Link to={`/dogs/${kennel._id}`} className="find-dog">
                    Find Your Dog
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KennelPage;
