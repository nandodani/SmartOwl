import React from "react";
import "../assets/styles/nav.css";
import { ReactComponent as LogoColor } from "../assets/images/logo_color.svg";
import { Link } from "react-router-dom";

const Nav = () => (
  <div className="Footer">
    <Link to="/" style={{ textDecoration: "none" }}>
      <LogoColor
        className="Logo"
        style={{
          height: "100%",
        }}
      />
    </Link>
    <div className="ButtonsNav">
      <Link to="/FAQ" style={{ textDecoration: "none" }}>
        <button className="ButtonNav">FAQ</button>
      </Link>
      <Link to="/contacts" style={{ textDecoration: "none" }}>
        <button className="ButtonNav">Contacts</button>
      </Link>
    </div>
  </div>
);

export default Nav;
