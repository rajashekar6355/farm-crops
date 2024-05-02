import React, { useContext } from "react";
import "./Farmitem.css";
import { fassets } from "../../assets/frontend_assets/fassets"; 
import { Storecontext } from "../context/Storecontext";

const Farmitem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(Storecontext);

  return (
    <div className="farm-item">
      <div className="farm-item-img-container">
        <img className="farm-item-img" src={url+"/images/"+image} alt="" />
      </div>

      <div className="farm-item-info">
        <div className="farm-item-name-rating">
          <p>{name}</p>
          <img src={fassets.rating_starts} alt="" />
        </div>
        <p className="farm-item-desc">{description}</p>
        <p className="farm-item-price">₹{price} per KG</p>
      </div>
      <div className="item-add-remove">
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={fassets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={fassets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]} KG</p>
            <img
              onClick={() => addToCart(id)}
              src={fassets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmitem;
