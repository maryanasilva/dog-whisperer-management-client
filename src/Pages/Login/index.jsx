import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";

const API_URL = 'http://localhost:5005';

const videoUrl =
    'https://player.vimeo.com/external/503450246.sd.mp4?s=cb024b2ead85efa62d5b5db6a0da6938ce752bb4&profile_id=164&oauth2_token_id=57447761';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const {storeToken, authenticateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {email, password};

        axios.post(`${API_URL}/auth/login`, requestBody)
        .then((response) => {
          if (response.data && response.data.authToken) {
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');
            
            // Check if user is a kennel manager
            if (response.data.payload && response.data.payload.IsKennelsManager === true) {
              navigate('/manager'); // Redirect to manager page
            } else {
              navigate('/user'); // Redirect to user page
            }
          } else {
            console.error("Invalid response from the server:", response);
          }
        })
        .catch((error) => {
          if (error.response) {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          } else {
            console.error("An error occurred:", error);
          }
        });
      
}
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="email" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>Password:
                    <input type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </label>

            <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Don't have an account yet?</p>
            <Link to="/signup"></Link>
        </div>
    )
}

export default LoginPage;