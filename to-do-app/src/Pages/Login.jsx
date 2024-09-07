import { Row,Container, Col,Form,FloatingLabel} from "react-bootstrap";
import users from '../Data/users.json'
import { useContext, useEffect, useReducer, useState } from "react";
import {getUserInitialData,initialUserData, userReducer} from '../Reducers/User'
import { UserContext } from "../App";

const Login=()=>{
    const[username, setUsername]=useState(null)
    const[password, setPassword]=useState(null)
    const[loginError,setLoginError]=useState(null)
    const {userState, userDispatch}=useContext(UserContext);
    
    const checkCredentials=()=>{
      if(username===null || username.trim()===''||password===null||password.trim()===''){
        setLoginError("NISU UNETI DOBRI KREDENCIJALI")
        return;
      }
      let foundUser=false;
      users.forEach((user,index)=>{
        if(user.username===username && user.password===password){
          foundUser=true;
          setLoginError(null);
          userDispatch({type:"SET_USERNAME",payload: username});
          userDispatch({type:"SET_IS_LOGGED_IN",payload:true})
          userDispatch({type:"SET_LOGIN_TIME",payload:new Date().getTime()})
        }
      })
      if (!foundUser){
        setLoginError("NISMO NASLI USERA S TIM KREDENCIJALIMA")
      }

    }
    useEffect(() => {
      if (userState.isLoggedIn) {
        localStorage.setItem("userData", JSON.stringify(userState)); // Ensure userState is the correct variable
      }
    }, [userState]);
    

    return(
        <Container>
            <Row>
              
              <div>
                <p>{loginError}</p>
              </div>
            </Row>
            {!userState.isLoggedIn &&
                 
                <form>
                  <div>
                <h2>Login</h2>
              </div>

                  <FloatingLabel controlId="floatingInput" label="Username" className="mb-3"
      >
                    <Form.Control onInput={e=>setUsername(e.currentTarget.value)} type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control onInput={e=>setPassword(e.currentTarget.value)}  type="password" placeholder="Password" />
                  </FloatingLabel>
                  <div className="button-container">
                    <button type="button" onClick={checkCredentials} className="loginButton">Login</button>

                  </div>
                  
                  

                </form>

              
            
            }
           
        </Container>
        
    )
}
export default Login;