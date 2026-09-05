import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faGlobe,
  faCity,
  faPhone,
  faArrowLeft,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in username, email, and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("/auth/register", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed. Please try a different username/email."
      );
    } finally {
      setLoading(false);
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
            <h1>Create Account</h1>
            <p>Join Nisargbooking for exclusive rates and member benefits</p>
          </div>

          {error && (
            <div className="authAlert authAlertError">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>{typeof error === "string" ? error : "Something went wrong!"}</span>
            </div>
          )}

          {success && (
            <div className="authAlert authAlertSuccess">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Account created successfully! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="authForm">
            <div className="authFormGrid">
              <div className="authInputGroup">
                <label htmlFor="username">Username *</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faUser} className="authInputIcon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="authInputGroup">
                <label htmlFor="email">Email Address *</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="authInputIcon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="authInputGroup fullWidth">
                <label htmlFor="password">Password *</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faLock} className="authInputIcon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="authInputGroup">
                <label htmlFor="country">Country (Optional)</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faGlobe} className="authInputIcon" />
                  <input
                    type="text"
                    id="country"
                    placeholder="e.g. United States"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="authInputGroup">
                <label htmlFor="city">City (Optional)</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faCity} className="authInputIcon" />
                  <input
                    type="text"
                    id="city"
                    placeholder="e.g. New York"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="authInputGroup fullWidth">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <div className="authInputWrapper">
                  <FontAwesomeIcon icon={faPhone} className="authInputIcon" />
                  <input
                    type="tel"
                    id="phone"
                    placeholder="e.g. +1 234 567 8900"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="authSubmitBtn"
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          <div className="authFooter">
            <span>Already have an account?</span>
            <Link to="/login" className="authSwitchLink">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
