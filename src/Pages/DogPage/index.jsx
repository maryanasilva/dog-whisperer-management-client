import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

const DogPage = () => {
  const { kennelId } = useParams();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    console.log(`Fetching dogs for kennel with ID: ${kennelId}`);
    // Fetch dogs data for the specified kennel ID from the backend
    axios
      .get(`${API_URL}/api/kennels/${kennelId}`) // Updated API endpoint
      .then((response) => {
        console.log("Dogs data response:", response.data);
        setDogs(response.data.dogs);
      })
      .catch((error) => {
        console.error(
          `Error fetching dogs for kennel with ID ${kennelId}`,error);
      });
  }, [kennelId]);

  const deleteDog = (dogId) => {
    // Send an API request to delete the dog by ID
    axios
      .delete(`${API_URL}/api/dogs/${dogId}`)
      .then(() => {
        // Remove the deleted dog from the state
        setDogs((prevDogs) => prevDogs.filter((dog) => dog._id !== dogId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="kennel-dogs-page">
      <Link to={`/kennels/${kennelId}/add-dog`}>Add Dog</Link>
      <h2>Dogs: </h2>
      <div
        className="dog-cards"
        style={{ overflowY: "scroll", maxHeight: "400px" }}
      >
        {dogs.map((dog) => (
          <div key={dog._id} className="dog-card">
            <img src={dog.image} alt={dog.name} />
            <h3>Name: {dog.name}</h3>
            <h3>Age: {dog.age}</h3>
            <h3>Genre: {dog.genre}</h3>
            <h3>Size: {dog.size}</h3>
            <p>Description: {dog.description}</p>
            <Link to={`/kennels/${kennelId}/edit-dog/${dog._id}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button onClick={() => deleteDog(dog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogPage;
