import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import "./Sidebar.scss";

const Sidebar = () => {
  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FiHome /> },
    { path: "/products", label: "Products", icon: <FiBox /> },
    { path: "/orders", label: "Orders", icon: <FiShoppingCart /> },
    { path: "/users", label: "Users", icon: <FiUsers /> },
    { path: "/settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h3>Isabella Admin</h3>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>

            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
