import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/adassets";

const Navbar = () => {
    return (
        <div className="navbar" id="navbar">
            <img className="logo" src={assets.logo} alt="" />
            <h1>ADMIN PANEL</h1>
            <img className="profile" src={assets.profile_image} alt="" />
        </div>
    );
};

export default Navbar;
