import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const API_URL = "http://localhost:5005";

const DogPage = () => {
  const { kennelId } = useParams();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    console.log(`Fetching dogs for kennel with ID: ${kennelId}`);
    // Fetch dogs data for the specified kennel ID from the backend
    axios
      .get(`${API_URL}/api/kennels/${kennelId}`)
      .then((response) => {
        console.log("Dogs data response:", response.data);
        setDogs(response.data.dogs);
      })
      .catch((error) => {
        console.error(
          `Error fetching dogs for kennel with ID ${kennelId}`,
          error
        );
      });
  }, [kennelId]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Container maxWidth="md">
        <h2>Adopt these little friends:</h2>
        <div>
          {dogs.map((dog) => (
            <div
              key={dog._id}
              style={{
                display: "flex",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={dog.image}
                alt={dog.name}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "20px",
                }}
              />
              <div>
                <Typography variant="h5">
                  <strong>{dog.name}</strong>
                </Typography>
                <Typography variant="subtitle1">Age: {dog.age}</Typography>
                <Typography variant="subtitle1">Genre: {dog.genre}</Typography>
                <Typography variant="subtitle1">Size: {dog.size}</Typography>
                <Typography variant="subtitle1">
                  Description: {dog.description}
                </Typography>
                {/* Redirect to the Adoption Page when clicking "Adopt" */}
                <Link to="/adoptions">
                  <Button variant="contained" color="primary">
                    Adopt
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          to={`/kennels/${kennelId}/add-dog`}
          style={{ display: "block", marginTop: "20px" }}
        >
          <Button variant="contained" color="secondary">
            Add Dog
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default DogPage;
