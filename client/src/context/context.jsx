import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {Link , useNavigate} from 'react-router-dom';

export const AuthContext = createContext();


export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", inputs,{ withCredentials: true});
    console.log(response.data);
    setCurrentUser(response.data);
    return response;
  };

  const logout = async (inputs) => {
    const response = await axios.post("http://localhost:3000/api/auth/logout");
    console.log(response.data.message)
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};