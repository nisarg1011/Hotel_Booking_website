import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faGlobe,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navContainer">
        <Link to="/" className="navBrand">
          <div className="navBrandIcon">
            <FontAwesomeIcon icon={faCrown} />
          </div>
          <div className="navBrandText">
            <span className="logoMain">NISARG</span>
            <span className="logoSub">COLLECTION</span>
          </div>
        </Link>

        <div className="navCenterLinks">
          <Link to="/" className="navLink active">Stays</Link>
          <Link to="/hotels" className="navLink">Villas</Link>
          <Link to="/hotels" className="navLink">Experiences</Link>
          <div className="navBadge">
            <span>VIP Rewards</span>
          </div>
        </div>

        <div className="navRight">
          <div className="navCurrency">
            <FontAwesomeIcon icon={faGlobe} className="currencyIcon" />
            <span>USD $</span>
          </div>

          {user ? (
            <div className="navUser">
              <div className="navUserBadge">
                <FontAwesomeIcon icon={faUserCircle} className="userIcon" />
                <span className="navUsername">{user.username}</span>
              </div>
              <button
                className="navButton logoutBtn"
                onClick={handleLogout}
                title="Sign out"
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </div>
          ) : (
            <div className="navAuthButtons">
              <Link to="/register">
                <button className="navButton registerBtn">Join Club</button>
              </Link>
              <Link to="/login">
                <button className="navButton loginBtn">Sign In</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
