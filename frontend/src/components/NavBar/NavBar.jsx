import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Home</b>
          </Link>
        </li>
        <li className="brand">
          <Link
            to="/customer/"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Customer</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/parks/" style={{ textDecoration: "none", color: "white" }}>
            <b>Parks</b>
          </Link>
        </li>
        <li className="brand">
          <Link to="/hotel/" style={{ textDecoration: "none", color: "white" }}>
            <b>Hotels</b>
          </Link>
        </li>
        <li className="brand">
          <Link
            to="/vacation_plan/"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Vacation Plans</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
