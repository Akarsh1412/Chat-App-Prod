import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login", user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      dispatch(setAuthUser(res.data));
      toast.success("Login Successful!");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }

    setUser({ userName: "", password: "" });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            className="auth-input"
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="off"
            spellCheck="false"
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>

        <div className="auth-footer">
          New user? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
