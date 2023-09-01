import {useState} from 'react';
import axios from 'axios';
import { AuthContext } from 'path-to-your-auth-context'

const API_URL = 'http://localhost:5005';

function AddKennel() {
    // State declaration
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    // Get the user's manager status from the contex
    const { isKennelManager } = useContext(AuthContext); 
    
    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

    // Check if the user is a manager before allowing kennel creation
    if (!isKennelManager) {
        console.log("Only managers can add kennels.");
        return;
    }

    const requestBody = {name, description, location, image};

    axios.post(`${API_URL}/api/kennels`, requestBody)
    .then(() => {
        setName("");
        setDescription("");
        setLocation("");
        setImage("");
    })
    .catch((error) => console.log(error))
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" 
                name='name' 
                value={name} 
                onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label>
                Description:
                <input type="text" 
                name='description' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label>
                Location:
                <input type="text" 
                name='location' 
                value={location} 
                onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label>
                Image:
                <input type="text" 
                name='image' 
                value={image} 
                onChange={(e) => setDescription(e.target.value)} />
            </label>

            <button type='submit'>Create a Kennel</button>
        </form>
    </div>
  )
}

export default AddKennel;