import React, { useContext, useEffect, useState } from "react";
import "./placeorder.css";
import { Storecontext } from "../../components/context/Storecontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  
  const {
    getTotalCartAmount,
    totalDeliveryCost,
    token,
    food_list,
    cartItems,
    url,
  } = useContext(Storecontext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: [value] }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + totalDeliveryCost() + 5,
    }
    // Integration of frontend with backend api calls for payment
    let response = await axios.post(url + "/api/order/place", orderData, { headers: {token} })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      window.alert('Please login to proceed.');
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
      
    }
  },[token])

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order" id="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
            <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
          </div>
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" required />
          <input name="address" onChange={onChangeHandler} value={data.address} type="text" placeholder="Address" required />
          <div className="multi-field">
            <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required />
            <select name="state" onChange={onChangeHandler} value={data.state} id="states" required>
              <option value="">Select a state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli">
                Dadra and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
          <div className="multi-field">
            <input name="pincode" onChange={onChangeHandler} value={data.pincode} type="text" placeholder="Pincode" required />
            <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required />
          </div>
          <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone Number" required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{totalDeliveryCost()}</p>
            </div>
            <div className="cart-total-details">
              <p>platform charges *</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + totalDeliveryCost() + 5}
              </b>
            </div>
            <div className="pay-btn">
              <button type="submit">PROCEED TO PAYMENT</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
