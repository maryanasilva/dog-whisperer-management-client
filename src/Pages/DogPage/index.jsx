import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:5005"

const DogPage = () => {
  const { kennelId } = useParams();
  const [dogs, setDogs] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
    setSelectedDog(dog);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleFormSubmit = () => {
    // Handle the form submission here, e.g., send a notification to the manager or store the request.
    // You can use the formData state to access the user's input.
    console.log("Adoption request submitted:", formData);

    // Close the form dialog
    setOpenForm(false);

    // Optionally, reset the form fields
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAdoptClick(dog)}
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
      </Container>

      {/* Adoption Form Dialog */}
      <Dialog open={openForm} onClose={handleFormClose}>
        <DialogTitle>Adoption Request</DialogTitle>
        <DialogContent>
          <form>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DogPage;
