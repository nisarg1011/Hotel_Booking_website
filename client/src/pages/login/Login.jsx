import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faArrowLeft,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../register/register.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: "Please enter your username and password." },
      });
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          err.response?.data || { message: "Invalid username or password." },
      });
    }
  };

  const handleDemoFill = (role) => {
    if (role === "admin") {
      setCredentials({ username: "admin", password: "password123" });
    } else {
      setCredentials({ username: "john_doe", password: "password123" });
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authHeader">
          <Link to="/" className="authBackLink">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
          </Link>
          <div className="authBrand">
            <h2>Nisarg<span>booking</span></h2>
          </div>
        </div>

        <div className="authCard">
          <div className="authCardHeader">
            <h1>Welcome Back</h1>
            <p>Sign in to access your bookings, Genius rewards, and saved properties</p>
          </div>

          {error && (
            <div className="authAlert authAlertError">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>
                {error.message ||
                  (typeof error === "string" ? error : "Login failed. Please try again.")}
              </span>
            </div>
          )}

          <form onSubmit={handleClick} className="authForm">
            <div className="authFormGrid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="authInputGroup">
                <label htmlFor="username">Username</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faUser} className="authInputIcon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="authInputGroup">
                <label htmlFor="password">Password</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faLock} className="authInputIcon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="authSubmitBtn"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="authDemoBox">
            <div className="authDemoTitle">Quick Demo Login</div>
            <div className="authDemoButtons">
              <button
                type="button"
                className="authDemoBtn"
                onClick={() => handleDemoFill("admin")}
              >
                Auto-fill Admin
              </button>
              <button
                type="button"
                className="authDemoBtn"
                onClick={() => handleDemoFill("user")}
              >
                Auto-fill User
              </button>
            </div>
          </div>

          <div className="authFooter">
            <span>Don't have an account?</span>
            <Link to="/register" className="authSwitchLink">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
