import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";

export default function Clock() {
    const [dayOfTheWeek, setDayOfWeek] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[now.getDay()];
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        setDayOfWeek(dayOfWeek);
        setTime(`${hours}:${minutes}`);
        setDate(`${day} ${month} ${year}`);
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
  
  return (
    <div className="Clock">
        <p className="DayOfTheWeek">{dayOfTheWeek}</p>
        <p className="Time">{time}</p>
        <p className="Date">{date}</p>
    </div>
  );
}
