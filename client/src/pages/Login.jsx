import {React,useState} from 'react'
import {Link , useNavigate} from 'react-router-dom';
import { useContext } from "react";
import {AuthContext}  from '../context/context';
import axios from 'axios';


const login = () => {
    const [inputs, setInputs] = useState({
      username: "",
      password: ""
    });


    //console.log(inputs);
  
    const navigate = useNavigate();
    const {login, currentUser } = useContext(AuthContext);
    console.log(currentUser);
      
    const [err,setError] = useState(null);
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name] : e.target.value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
       const response = await login(inputs);
        console.log(response);
        navigate("/");
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      }
    };

  return (
    <div className= "auth">
        <h1>Login</h1>
        <form>
        <input type="test" placeholder="username" name = "username" onChange = {handleChange} ></input>
        <input type ="password" placeholder="password" name = "password" onChange = {handleChange} ></input>
        { err &&   <p>{err}</p> }
        <button  type="Submit" onClick={handleSubmit}>Login</button>
        <span>Dont have an Account? <Link to = "/register">Register Now</Link></span>
        </form>
        

    </div>
  )
}

export default login