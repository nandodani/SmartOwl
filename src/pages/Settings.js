import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/settings.css";
import Tabs from "../components/tabs";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function Settings() {
  let navigate = useNavigate();

  return (
    <div className="Settings">
      <button
        className="IconButton"
        aria-label="Settings and Logout Dropdown"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon
          style={{ width: "25px", height: "25px", color: "black" }}
        />
      </button>
      <Tabs />
    </div>
  );
}

export default Settings;
