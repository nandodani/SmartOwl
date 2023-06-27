import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import Calendar from "react-calendar";
import "../assets/styles/calendar.css";

function Rectangle() {
  return (
    <div className="rectangle">
      <h3>Calendar</h3>
      <Calendar />
    </div>
  );
}

export default Rectangle;
