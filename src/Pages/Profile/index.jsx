import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://dog-whisperer.onrender.com";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [kennelNames, setKennelNames] = useState({});

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setUser(response.data);
      setDogs(response.data.ownedDogs);
      setAdoptionRequests(response.data.adoptionRequests);

      if (response.data.userType === "user") {
        setManager(false);
      } else {
        setManager(true);
      }

      // Fetch kennel names for each dog
      const kennelNamesPromises = response.data.ownedDogs.map(async (dog) => {
        const kennelResponse = await axios.get(
          `${API_URL}/api/kennels/${dog.kennel}`
        );
        return { [dog._id]: kennelResponse.data.name }; // Store the kennel name with dog ID as key
      });

      const kennelNameMappings = await Promise.all(kennelNamesPromises);
      const kennelNameObject = Object.assign({}, ...kennelNameMappings);
      setKennelNames(kennelNameObject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
    <div>
      <h1>Hello {user ? user.name : "User"}, this is your profile page</h1>
      <div>
        <p>{user && user.userType}</p>
        <p>Name: {user && user.name}</p>
        <p>Email: {user && user.email}</p>
      </div>
      <div
        className="dog-cards"
        style={{ overflowY: "scroll", maxHeight: "400px" }}
      >
        <h2>Your Dogs</h2>
        {dogs &&
          dogs.map((dog) => (
            <div key={dog._id} className="dog-card">
              <img src={dog.image} alt={dog.name} />
              <h3>Name: {dog.name}</h3>
              <h3>Age: {dog.age}</h3>
              <h3>Genre: {dog.genre}</h3>
              <h3>Size: {dog.size}</h3>
              <p>Description: {dog.description}</p>
              <p>Kennel: {kennelNames[dog._id]}</p>
              <Link to={`/kennels/${dog.kennel}/edit-dog/${dog._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button onClick={() => deleteDog(dog._id)}>Delete</button>
            </div>
          ))}
      </div>

      {/* Conditionally render the adoption requests */}
      {user && user.userType === "user" && (
        <div>
          <h2>Your Adoption Requests</h2>
          <ul>
            {adoptionRequests.map((request) => (
              <li key={request._id}>
                Dog: {request.dog.name}, Status: {request.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the manager approval section */}
      {manager && (
        <div>
          <h2>Manager Approval Section</h2>
          {/* Include the manager approval UI or functionality here */}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
