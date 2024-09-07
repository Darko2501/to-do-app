import React, { createContext, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getUserInitialData, userReducer } from './Reducers/User';
import Navigation from './Partials/Navigations'
export const UserContext = createContext();

function App() {
  const [userState, userDispatch] = useReducer(userReducer, getUserInitialData());

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <BrowserRouter>
        <UserContext.Provider value={{ userState, userDispatch }}>
          <Navigation/>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
      </UserContext.Provider>
    
  );
}

export default App;
