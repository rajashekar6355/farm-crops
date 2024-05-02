import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/admin_assets/adassets";
import { fassets } from "../../assets/frontend_assets/fassets";
import { Link, useNavigate } from "react-router-dom";
import { Storecontext } from "../context/Storecontext";
export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(Storecontext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="nav-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="/#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contactus")}
          className={menu === "contactus" ? "active" : ""}
        >
          ContactUs
        </a>
      </ul>
      <div className="navbar-right">
        <img className="search_icon" src={fassets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img
              onClick={() => setMenu("All")}
              className="basket_icon"
              src={fassets.basket_icon}
              alt=""
            />
            <div className={token && getTotalCartAmount() ? "dot-update" : getTotalCartAmount() ? "dot" : ""}></div>

          </Link>

        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={fassets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={fassets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={fassets.logout_icon} alt="" />
                <p>Log&nbsp;Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
