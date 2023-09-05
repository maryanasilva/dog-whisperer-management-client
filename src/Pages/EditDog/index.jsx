import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditDogPage() {
  const { dogId } = useParams();
  const {kennelId} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  //console.log("dog id", dogId);
  //console.log("kennel", kennelId);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/singledog/${dogId}`)
      .then((response) => {
        const oneDog = response.data;
        setName(oneDog.name);
        setDescription(oneDog.description);
        setAge(oneDog.age);
        setGenre(oneDog.genre);
        setSize(oneDog.size);
        setImage(oneDog.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dogId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      age,
      description,
      genre,
      size,
      image,
    };

    axios
      .put(`${API_URL}/api/dogs/${dogId}`, requestBody)
      .then(() => {
        navigate(`/dogs/${kennelId}`); // Navigate to the dog's details page after editing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*   const deleteDog = () => {
    axios
      .delete(`${API_URL}/api/dogs/${dogId}`)
      .then(() => {
        navigate('/'); // Navigate to the home page after deleting
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <div className="edit-dog-container">
      <div className="edit-dog-form-container">
        <h2 className="edit-dog-heading">🐾 Edit Dog 🐾</h2>
        <form onSubmit={handleSubmit} className="edit-dog-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <input
              type="text"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-control"
            />
          </div>

        <button type="submit">Edit</button>
      </form>

      <button onClick={deleteDog}>Delete</button>
    </div>
  );
}

export default EditDogPage;
