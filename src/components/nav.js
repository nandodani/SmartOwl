import React from "react";
import "../assets/styles/nav.css";
import { ReactComponent as LogoColor } from "../assets/images/logo_color.svg";
import { Link } from "react-router-dom";

const Nav = () => (
  <div className="Nav">
    <Link to="/" style={{ textDecoration: "none" }}>
      <LogoColor
        className="Logo"
        style={{
          height: "100%",
        }}
      />
    </Link>
    <div className="ButtonsNav">
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <button className="ButtonNav">Sign Up</button>
      </Link>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button className="ButtonNav">Login</button>
      </Link>
    </div>
  </div>
);

export default Nav;
