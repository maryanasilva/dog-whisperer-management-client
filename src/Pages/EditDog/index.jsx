import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://dog-whisperer.onrender.com";

function EditDogPage() {
  const { dogId, kennelId } = useParams();
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
        // Navigate to the dog's details page after editing
        navigate(`/profile`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*   const deleteDog = () => {
    axios
      .delete(`${API_URL}/api/dogs/${dogId}`)
      .then(() => {
        navigate("/"); // Navigate to the home page after deleting
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <div>
      <h2 style={{color:"black"}}>Edit Dog</h2>
      <form onSubmit={handleSubmit}>
      <label style={{color: '#000'}}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label style={{color: '#000'}}>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label style={{color: '#000'}}>
          Age:
          <input
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label style={{color: '#000'}}>
          Genre:
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>

        <label style={{color: '#000'}}>
          Size:
          <input
            type="text"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label style={{color: '#000'}}>
          Image:
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button type="submit">Edit</button>
      </form>

      {/*       <button onClick={deleteDog}>Delete</button> */}
    </div>
  );
}

export default EditDogPage;
