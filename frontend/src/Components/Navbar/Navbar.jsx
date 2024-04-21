import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";
import { toast } from "react-toastify";


const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const navigate = useNavigate();
  const { getTotalCartItems } = useContext(ShopContext);
  const isLogedIn = localStorage.getItem("auth-token") ? true : false;

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" className="poshak-logo" />
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link to="/men">Men</Link>
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link to="/women">Women</Link>
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids">Kids</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLogedIn ? (
          <button onClick={()=>{
            localStorage.removeItem("auth-token");
            navigate("/login")
            toast.success("You're logged out successfully !!")
          }}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <button>Login</button>
            </Link>
            <Link to="/signup">
              {" "}
              <button>Signup</button>
            </Link>
          </>
        )}
            <Link to="/cart">
              {" "}
              <img src={cart_icon} alt="" />
            </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
