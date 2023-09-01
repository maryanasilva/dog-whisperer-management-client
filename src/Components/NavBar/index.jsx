import React from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react'; 
import { AuthContext } from '../../Context/auth.context';

function Navbar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
          <Link to="/">
              <button>Home</button>
          </Link>
      </div>
      
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <button onClick={logOutUser}>Logout</button>
            <p>{user && user.name}</p>
          </>
        ) : (
          <>
            <Link to="/signup"><button>Signup</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;