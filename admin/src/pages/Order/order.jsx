import React from 'react'
import './order.css'
import axios from "axios";
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/adassets'



const Order = ({ url }) => {

  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {

    //fetching orders from backend to frontend
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }

  }
  const statusHandler = async(event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
        await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity+" KG"
                  } else {
                    return item.name + " x " + item.quantity + " KG, "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.address}</p>
                <p>{order.address.city + ", " + order.address.state + "," + order.address.country + ", " + order.address.pincode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone} </p>
            </div>
            <p className='order-item-no_items'>Items: {order.items.length}</p>
            <p className='order-item-amount' >₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
              <option value="Order Placed">Order Placed</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order;
