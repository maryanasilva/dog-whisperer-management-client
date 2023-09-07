import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://dog-whisperer.onrender.com";

function AddDog() {
  // State declaration
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const { kennelId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  // Handle submit form
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
      .post(`${API_URL}/api/${kennelId}/kennels`, requestBody, {
        // check if there is an authentication/user
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setName("");
        setDescription("");
        setAge("");
        setGenre("");
        setSize("");
        setImage("");
        navigate(`/dogs/${kennelId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="create-new-dog"> New Dog</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ color: "#000" }}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label style={{ color: "#000" }}>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label style={{ color: "#000" }}>
          Age:
          <input
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label style={{ color: "#000" }}>
          Genre:
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>

        <label style={{ color: "#000" }}>
          Size:
          <input
            type="text"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label style={{ color: "#000" }}>
          Image:
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button type="submit" className="create-dog-button">
          Create a Dog
        </button>
      </form>
    </div>
  );
}

export default AddDog;
