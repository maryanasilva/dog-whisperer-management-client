import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const API_URL = "http://localhost:5005";

const AdoptionPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleAdoptClick = () => {
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleFormSubmit = () => {
    const adoptionRequestData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    // Send the adoption request to the server
    axios
      .post(`${API_URL}/api/adoptions`, adoptionRequestData)
      .then((response) => {
        console.log("Adoption request submitted:", response.data.message);
        // Handle any success message or action here if needed
        setOpenForm(false);
        navigate("/dogs"); // Redirect to the Adoption Page
      })
      .catch((error) => {
        console.error("Error submitting adoption request:", error);
        // Handle any error message or action here if needed
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
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Adoption Page
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAdoptClick}>
        Adopt a Pet
      </Button>

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
    </Container>
  );
};

export default AdoptionPage;
