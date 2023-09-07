import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const API_URL = "https://dog-whisperer.onrender.com";

const DogPage = () => {
  const { kennelId } = useParams();
  const [dogs, setDogs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [selectedDog, setSelectedDog] = useState(null);
  const navigate = useNavigate();

  const handleAdoptionSubmit = () => {
    if (selectedDog) {
      const adoptionRequestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dogId: selectedDog._id,
      };

      axios
        .post(`${API_URL}/api/adoptions`, adoptionRequestData)
        .then((response) => {
          console.log("Adoption request submitted:", response.data.message);
          navigate("/kennels");
        })
        .catch((error) => {
          console.error("Error submitting adoption request:", error);
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
    axios
      .get(`${API_URL}/api/kennels/${kennelId}`)
      .then((response) => {
        console.log("Dogs data response:", response.data);
        setDogs(response.data.dogs);
      })
      .catch((error) => {
        console.error(`Error fetching dogs for kennel with ID ${kennelId}`, error);
      });
  }, [kennelId]);

  const handleAdoptClick = (dog) => {
    setSelectedDog(dog);
    
    // Scroll down to the form
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "auto", // Can change this to "smooth"
    });
  };

  return (
    <div className="dog-page" style={{ backgroundColor: "#f0e6df", minHeight: "100vh", paddingTop: "90px" }}>
      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <Grid item key={dog._id} xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#d0a974", textAlign: "center" }}>
              <img
                src={dog.image}
                alt={dog.name}
                style={{ maxWidth: "100%", borderRadius: "50%", marginBottom: "20px" }}
              />
              <Typography variant="h5" component="div">
                <strong>{dog.name}</strong>
              </Typography>
              <Typography variant="subtitle1">Age: {dog.age}</Typography>
              <Typography variant="subtitle1">Genre: {dog.genre}</Typography>
              <Typography variant="subtitle1">Size: {dog.size}</Typography>
              <Typography variant="subtitle1">Description: {dog.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdoptClick(dog)}
                style={{ marginTop: "20px", width: "100%" }}
              >
                Adopt
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {selectedDog && (
        <div style={{ marginTop: "20px", color: "black"}}>
          <Typography variant="h5" align="center">
            You're about to adopt {selectedDog.name}!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Please fill in your information to complete the adoption.
          </Typography>
          <Grid container spacing={3} style={{ justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={selectedDog.image}
                    alt={selectedDog.name}
                    style={{ maxWidth: "100%", borderRadius: "50%" }}
                  />
                </div>
                <Typography variant="h5" component="div" style={{ textAlign: "center", marginTop: "10px" }}>
                  <strong>{selectedDog.name}</strong>
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                  Age: {selectedDog.age}
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                  Genre: {selectedDog.genre}
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                  Size: {selectedDog.size}
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                  Description: {selectedDog.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" align="center">
                  Your Information
                </Typography>
                <div style={{ marginTop: "20px" }}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                  <br />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                  <br />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdoptionSubmit}
                    style={{ width: "100%" }}
                  >
                    Confirm Adoption
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link
          to={`/kennels/${kennelId}/add-dog`}
          style={{ display: "block" }}
        >
          <Button variant="contained" color="secondary">
            Add Dog
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DogPage;
