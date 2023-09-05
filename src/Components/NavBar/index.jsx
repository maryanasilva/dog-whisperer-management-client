import React from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react'; 
import { AuthContext } from '../../Context/auth.context';

function Navbar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
          <Link to="/"><button>Home</button></Link>
          <Link to="/kennels"><button>Kennels</button></Link>
          <Link to="/schools"><button>Schools</button></Link>
          <Link to="/petCare"><button>Pet Care</button></Link>
      </div>
      
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <div className="user-info">
              
              <Link to="/profile">{user && user.name}</Link>
            </div>
            <button onClick={logOutUser}>Logout</button>
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