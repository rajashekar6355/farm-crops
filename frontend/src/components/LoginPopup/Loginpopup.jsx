import React, { useContext, useState } from "react";
import "./Loginpopup.css";
import { fassets } from "../../assets/frontend_assets/fassets";
import { Storecontext } from "../context/Storecontext";
import axios from "axios";
import { toast } from "react-toastify";

const Loginpopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(Storecontext);

  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      window.location.reload();
      toast.success("Logged In successfully");
    } else {
      alert(response.data.message);
    }
  };
  

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={fassets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Your Name" required />)}
          <input onChange={onChangeHandler} value={data.email} type="email" name="email" placeholder="Your email" required
          />
          <input onChange={onChangeHandler} value={data.passoword} type="password" placeholder="Your password" name="password" required
          />
        </div>
        {currState === "Sign Up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />

            <p>By continuing, I accept all terms and conditions.</p>
          </div>
        ) : (
          <></>
        )}

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Create an New Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
