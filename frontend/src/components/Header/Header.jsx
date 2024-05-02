import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h2>Order your essential crops!!</h2>
          <p>
            Choose from our crop selection designed to meet your needs, ensuring
            top-notch quality and timely delivery for a successful harvest that
            exceeds expectations...
          </p>

          <button><a href="#explore-menu">View Menu</a></button>
        </div>
      </div>
    </div>
  );
};

export default Header;
