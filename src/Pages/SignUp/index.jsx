import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = 'http://localhost:5005';

function SignUpPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    // Default is false
    const [isKennelsManager, setIsKennelsManager] = useState(false);

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // prevent default actions
        e.preventDefault();

        // create our request body object
        const requestBody = {name, email, password};

        // we send these infos to Backend
        axios.post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
            if (isKennelsManager) {
                navigate('/manager'); // Redirect to manager page
            } else {
                navigate('/user'); // Redirect to user page
            }
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: <input type="email" name="email" value={email} 
                onChange={(e) => setEmail(e.target.value)}></input>
                </label>

                <label>Password: <input type="password" name="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}></input>
                </label>

                <label>Name: <input type="text" name="name" value={name} 
                onChange={(e) => setName(e.target.value)}></input>
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={isKennelsManager}
                        onChange={(e) => setIsKennelsManager(e.target.checked)}/>
                    Are you a kennel manager?
                </label>

                <button type="submit">Sign Up</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default SignUpPage;