import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/adassets'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {
    const[currState,nextState] = useState("active");
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="addicon" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.list_icon} alt="addicon" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/order' className="sidebar-option">
                <img src={assets.order_icon} alt="addicon" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar