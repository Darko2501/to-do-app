import { useContext } from 'react';
import { UserContext } from '../App';

const Navigation=()=>{
    const {userState}=useContext(UserContext);
    const logoutUser=()=>{
      localStorage.removeItem("userData")
      window.location.reload();
    };
    return(
        <>
        <div className='navBH'>
          <h1 className='mainH1'>MY TO-DO APP</h1>
        </div>
        <nav className='navB'>
        {userState.isLoggedIn &&
          <a className='navI' href="logout" onClick={logoutUser}>Logout</a>
        
        }
        {!userState.isLoggedIn &&
          <a className='navI' href="login" >Login</a>
        }
        </nav>
       
        
        </>
    )
}
export default Navigation;