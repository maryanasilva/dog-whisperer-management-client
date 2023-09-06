import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddKennel() {
  // State declaration
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [manager, setManager] = useState("");
  const { kennelId } = useParams();

/*     // Get the user's manager status from the contex
  const { autenticateUSer, manager } = useContext(AuthContext); */

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("authToken");
  
      let response = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
  
      if (response.data.userType === "manager") {
        // Only managers can create kennels
        const requestBody = { name, description, location, image };
  
        axios
          .post(`${API_URL}/api/kennels/add-kennels`, requestBody)
          .then(() => {
            setName("");
            setDescription("");
            setLocation("");
            setImage("");
            navigate(`/kennels`);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Only managers can add kennels.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button type="submit">Create a Kennel</button>
      </form>
    </div>
  );
}

export default AddKennel;
