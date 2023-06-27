import React, { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

const ToastDemo = ({ reminderTitle, eventDate }) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date();

    if (eventDate && currentDate > eventDate) {
      setOpen(true);
      timerRef.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }

    return () => clearTimeout(timerRef.current);
  }, [eventDate]);

  const handleReschedule = () => {
    // Implemente a lógica para reagendar o lembrete aqui
    setOpen(false);
  };

  return (
    <Toast.Provider>
      <Toast.Root open={open} onOpenChange={setOpen} sideOffset={20} align="center">
          <Toast.Title>{reminderTitle}</Toast.Title>
          <Toast.Description>It's time!</Toast.Description>
        <Toast.Close />
        <Toast.Action>
          <button className="Button small green" onClick={handleReschedule}>
            Reschedule
          </button>
        </Toast.Action>
      </Toast.Root>
    </Toast.Provider>
  );
};

export default ToastDemo;
