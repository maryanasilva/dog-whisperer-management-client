import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

// Define a styled component for the approval section container
const ApprovalSectionContainer = styled.div`
  text-align: center;
  padding-top: 20px;
`;

// Define a styled component for the approval cards container
const ApprovalCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// Define a styled component for the approval card
const ApprovalCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Define a styled component for buttons
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #0056b3;
  }
`;

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

  useEffect(() => {
    getUser();
    getAdoptions();
    deleteDog();
  }, []);

  return (
    <div style={{ color: "black" }}>
      {/* User Info and Image */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, padding: "0 20px" }}>
          <h1>Hello {user ? user.name : "User"}, this is your profile page</h1>
          <p>{user && user.userType}</p>
          <p>Name: {user && user.name}</p>
          <p>Email: {user && user.email}</p>
          {/* Add other user information here */}
        </div>

        {/* Image */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="https://images.pexels.com/photos/3198032/pexels-photo-3198032.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="User's Profile"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>

      <br />
      <hr />

      {/* Dogs */}
      <div className="dog-cards" style={{ overflowY: "scroll", maxHeight: "500px", marginTop: "40px" }}>
        <h2 style={{ color: "black" }}>Your Dogs</h2>
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

      <br />
      <hr />

      {/* Adoptions */}
      {manager && user.userType === "Manager" && (
      <ApprovalSectionContainer>
        <h2>Manager Approval Section</h2>
        {adoptionRequests && adoptionRequests.length > 0 ? (
          <ApprovalCardsContainer>
            {adoptionRequests.map((request) => {
              // Find the corresponding dog based on request.dogId
              const dog = dogs.find((dog) => dog._id === request.dogId);

              return (
                <ApprovalCard key={request._id}>
                  <div className="request-info">
                    <h3>Status: {request.status}</h3>
                    <h3>Requested Dog:</h3>
                    {dog && (
                      <>
                        <p>Dog Name: {dog.name}</p>
                        <p>Dog Age: {dog.age}</p>
                        <p>Dog Breed: {dog.breed}</p>
                        <p>Dog Size: {dog.size}</p>
                        <p>Dog Description: {dog.description}</p>
                      </>
                    )}
                    <h3>Requester Info:</h3>
                    <p>Requester Name: {request.name}</p>
                    <p>Requester Email: {request.email}</p>
                    <p>Requester Number: {request.phoneNumber}</p>
                    {/* Add other requester information here */}
                  </div>
                  <img
                    src={request.image}
                    alt={request.name}
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                  <div className="approval-buttons">
                    <Button onClick={() => approveAdoption(request._id)}>
                      Approve
                    </Button>
                    <Button onClick={() => rejectAdoption(request._id)}>
                      Reject
                    </Button>
                  </div>
                </ApprovalCard>
              );
            })}
          </ApprovalCardsContainer>
        ) : (
          <p>No pending approvals.</p>
        )}
      </ApprovalSectionContainer>
    )}
    </div>
  );
}

export default ProfilePage;