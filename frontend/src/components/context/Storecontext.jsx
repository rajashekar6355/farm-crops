import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/fassets";
import axios from "axios";
export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  // Adding to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // Integration of frontend with backend with api calls
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }
  };

  // Removing from cart
  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // Integration of frontend with backend with api calls
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
  };

  // total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // total Delivery Cost
  const totalDeliveryCost = () => {
    let amount = getTotalCartAmount();
    amount = amount * 0.05;
    // Round off to two decimal places
    amount = parseFloat(amount.toFixed(2));
    return amount;
  };

  //fetch food list from db
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/items/list");
    setFoodList(response.data.data);
  };
  // to display cart data when website is reloaded 
  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItem(response.data.cartData);
  }
  
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    totalDeliveryCost,
    url,
    token,
    setToken,
  };
  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};
export default StorecontextProvider;
