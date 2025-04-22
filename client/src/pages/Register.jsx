import { React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [err,setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name] : e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", inputs);
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <input
          required
          type="confirmPassword"
          placeholder="Confirm Your Password"
          name="confirmPassword"
          onChange={handleChange}
        ></input>
       { err && <p>{err}</p> }
        <button type="Submit" onClick={handleSubmit}>
          Register
        </button>
        <span>
          Do You have an Account? <Link to="/login">Login Now</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
