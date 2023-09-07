import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

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

      console.log("User Data:", response.data); // Log user data
      setUser(response.data);
      setDogs(response.data.ownedDogs);

      if (response.data.userType === "user") { // Check for "user" role (lowercase)
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

  const getAdoptions = async () => {
    try {
      let pending = await axios.get(`${API_URL}/api/adoptions`);
      console.log("Adoption Requests:", pending.data); // Log adoption requests data
      setAdoptionRequests(pending.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getAdoptions();
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
    <div style={{ marginTop: "100px", color: "black", paddingLeft: 20}}>
      <h1>Hello {user ? user.name : "User"}, this is your profile page</h1>
      <div>
        <p>{user && user.userType}</p>
        <p>Name: {user && user.name}</p>
        <p>Email: {user && user.email}</p>
      </div>
      <div className="dog-cards" style={{ overflowY: "scroll", maxHeight: "500px" }}>
        <h2>Your Dogs</h2>
        {dogs &&
          dogs.map((dog) => (
            <div  key={dog._id} className="dog-card">
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
      {user &&
        user.userType === "User" && (
          <div>
            <h2>Your Adoption Requests</h2>
            <ul>
              {adoptionRequests.map((request) => (
                <li key={request._id}>
                  Dog: {request.name}, Status: {request.status}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Conditionally render the manager approval section */}
      {manager && user.userType === "Manager" && (
        <div>
          <h2>Manager Approval Section</h2>
          {adoptionRequests && adoptionRequests.length > 0 ? (
            <div className="dog-cards" style={{ overflowY: "scroll", maxHeight: "400px" }}>
              {adoptionRequests.map((request) => (
                <div key={request._id} className="dog-card">
                  <img src={request.image} alt={request.name} />
                  <h3>Name: {request.name}</h3>
                  <h3>Status: {request.status}</h3>
                  <button
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => approveAdoption(request._id)}
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending approvals.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
