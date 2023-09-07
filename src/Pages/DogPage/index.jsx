import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:5005";

const DogPage = () => {
  const { kennelId } = useParams();
  const [dogs, setDogs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [selectedDog, setSelectedDog] = useState(null); // State for the selected dog

  const navigate = useNavigate();

  const handleAdoptionSubmit = () => {
    if (selectedDog) {
      // Handle the adoption process when the user submits the adoption form
      const adoptionRequestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dogId: selectedDog._id, // Use the selected dog's ID
      };

      // Send the adoption request to the server
      axios
        .post(`${API_URL}/api/adoptions`, adoptionRequestData)
        .then((response) => {
          console.log("Adoption request submitted:", response.data.message);
          // Handle any success message or action here if needed
          navigate("/kennels"); // Redirect to the Adoption Page
        })
        .catch((error) => {
          console.error("Error submitting adoption request:", error);
          // Handle any error message or action here if needed
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleAdoptClick = (dog) => {
    // Set the selected dog when the user clicks "Adopt"
    setSelectedDog(dog);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Container maxWidth="md">
        {selectedDog ? (
          <div>
            <h2>Adopt this little friend:</h2>
            <div key={selectedDog._id}>
              <img
                src={selectedDog.image}
                alt={selectedDog.name}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  marginRight: "20px",
                }}
              />
              <div>
                <Typography variant="h5">
                  <strong>{selectedDog.name}</strong>
                </Typography>
                <Typography variant="subtitle1">
                  Age: {selectedDog.age}
                </Typography>
                <Typography variant="subtitle1">
                  Genre: {selectedDog.genre}
                </Typography>
                <Typography variant="subtitle1">
                  Size: {selectedDog.size}
                </Typography>
                <Typography variant="subtitle1">
                  Description: {selectedDog.description}
                </Typography>
                <Typography variant="subtitle1">: {selectedDog.im}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdoptionSubmit}
                >
                  Adopt
                </Button>
              </div>
            </div>
            {/* Input adopter information */}
            <div>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                margin="normal"
              />
            </div>
          </div>
        ) : (
          <>
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
                    <Typography variant="subtitle1">
                      Genre: {dog.genre}
                    </Typography>
                    <Typography variant="subtitle1">
                      Size: {dog.size}
                    </Typography>
                    <Typography variant="subtitle1">
                      Description: {dog.description}
                    </Typography>
                    {/* Redirect to the Adoption Page when clicking "Adopt" */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAdoptClick(dog)} // Pass the dog object to the function
                    >
                      Adopt
                    </Button>
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
          </>
        )}
      </Container>
    </div>
  );
};

export default DogPage;
