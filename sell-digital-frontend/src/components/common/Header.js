import React, { useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLock} from "react-icons/ai";
import commonContext from "../../contexts/common/commonContext";
import AccountForm from "../form/AccountForm";
import SearchNavbar from "./SearchNavbar";
import "./Header.css";
import { getToken, removeToken } from "../../utils/localstorage"; // Import getToken function
const Header = () => {
  const { formUserInfo, toggleForm } = useContext(commonContext);
  const navigate = useNavigate();
  const token = getToken(); // Get the token from localStorage
  console.log("token",token)
  const handleLogout = () => {
    removeToken(); // Remove the token from localStorage
    toggleForm(false); // Reset formUserInfo to false
    navigate("/");
  };
  return (
    <>
      <header id="header">
        <div className="container light-color">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/"></Link>
            </h2>
            <nav className="nav_actions">
              <div className="cart_action item-hover header-display-none">
                <Link to="/about-us">
                  <p>About Us</p>
                </Link>
              </div>

              <div className="cart_action item-hover header-display-none">
                <Link to="/contact-us">
                  <p>Contact Us</p>
                </Link>
              </div>
              {token && (
                <div className="cart_action item-hover">
                  <Link to="/" onClick={handleLogout}>
                    <AiOutlineLock />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
              


              {token && (
                <div className="cart_action item-hover Icon-props">
                  <Link to="/update-profile">
                    <p>
                      <AiOutlineUser />
                    </p>
                  </Link>
                </div>
              )}
              {!token && !formUserInfo && (
                <div className="cart_action item-hover">
                  <button type="button" onClick={() => toggleForm(true)}>
                    Login / Signup
                  </button>
                </div>
              )}
              
            </nav>
          </div>
        </div>
      </header>
      <SearchNavbar />
      <AccountForm />
    </>
  );
};

export default Header;
