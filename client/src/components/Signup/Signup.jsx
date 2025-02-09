import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaMars, FaVenus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!user.gender) {
      toast.error("Please select a gender!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }

    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="signup-title">Create Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-group">
          <label className="signup-label">Full Name:</label>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleUser}
              required
              className="signup-input"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="signup-group">
          <label className="signup-label">Username:</label>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleUser}
              required
              className="signup-input"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="signup-group">
          <label className="signup-label">Password:</label>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUser}
              required
              className="signup-input"
            />
          </div>
        </div>

        <div className="signup-group">
          <label className="signup-label">Confirm Password:</label>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleUser}
              required
              className="signup-input"
            />
          </div>
        </div>

        <div className="signup-group">
          <label className="signup-label">Gender:</label>
          <div className="gender-container">
            <label className="gender-label male">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleUser}
                className="gender-radio"
              />
              <FaMars className="gender-icon male-icon" /> Male
            </label>
            <label className="gender-label female">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleUser}
                className="gender-radio"
              />
              <FaVenus className="gender-icon female-icon" /> Female
            </label>
          </div>
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <div className="login-prompt">
          Already a user? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
