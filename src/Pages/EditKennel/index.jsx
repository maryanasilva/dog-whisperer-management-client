import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005"

function EditKennelPage() {
  const { kennelId } = useParams();
  const navigate = useNavigate();

  // State declaration
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/singlekennels/${kennelId}`)
      .then((response) => {
        const oneKennel = response.data;
        setName(oneKennel.name);
        setDescription(oneKennel.description);
        setLocation(oneKennel.location);
        setImage(oneKennel.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [kennelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, description, location, image };

    axios
      .put(`${API_URL}/api/kennels/${kennelId}`, requestBody)
      .then(() => {
        navigate(`/kennel/${kennelId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteKennel = () => {
    axios
      .delete(`${API_URL}/api/kennels/${kennelId}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit Kennel</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Image:
          <input
            type="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button type="submit">Edit</button>
      </form>

      <button onClick={deleteKennel}>Delete</button>
    </div>
  );
}

export default EditKennelPage;
