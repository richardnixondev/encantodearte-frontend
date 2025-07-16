import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../AuthForm.css";

export default function Signup() {
  const [form, setForm] = useState({
    surname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    axios.post("http://localhost:5005/auth/signup", form)
      .then(() => {
        alert("Account created!");
        navigate("/login");
      })
      .catch(() => {
        alert("Error signing up");
      });
  };

  return (
    <div className="auth-form-container">
      <h1>Create Account</h1>
      <input name="surname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
