import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const API_URL = "https://dog-whisperer.onrender.com";

const AdoptionPage = () => {
  const [dogs, setDogs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [selectedDog, setSelectedDog] = useState(null); // State for the selected dog
  
  const navigate = useNavigate();

  // Fetch the list of dogs when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api/dogs`)
      .then((response) => {
        setDogs(response.data); // Set the list of dogs in the state
      })
      .catch((error) => {
        console.error("Error fetching dogs:", error);
      });
  }, []);

  const handleAdoptClick = (dog) => {
    // Set the selected dog when the user clicks "Adopt"
    setSelectedDog(dog);
  };

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
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Adoption Page
      </Typography>
      {selectedDog ? ( // Display the selected dog's info if it exists
        <div >
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
              <Typography variant="subtitle1">Age: {selectedDog.age}</Typography>
              <Typography variant="subtitle1">Genre: {selectedDog.genre}</Typography>
              <Typography variant="subtitle1">Size: {selectedDog.size}</Typography>
              <Typography variant="subtitle1">Description: {selectedDog.description}</Typography>
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
        // Display the list of dogs to choose from initially
        <div>
         /* <h2>Select a dog to adopt:</h2>
          {dogs.map((dog) => (
            <div key={dog._id}>
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
      )}
    </Container>
  );
};
export default AdoptionPage;