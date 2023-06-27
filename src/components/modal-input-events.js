import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/modal.css";

const ModalInput = ({
  title,
  description,
  confirmText,
  onClose,
  onConfirm,
  open,
  eventDate,
  eventLocation,
  eventLink,
  initialValue,
  locationLabel,
  linkLabel,
  dateLabel,
}) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const [linkEvent, setLink] = useState("");
  const [locationEvent, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = () => {
    onConfirm(inputValue, locationEvent, linkEvent, selectedDate);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Overlay className="Modal-DialogOverlay" />
      <Dialog.Content className="Modal-DialogContent">
        <Dialog.Title className="Modal-DialogTitle">{title}</Dialog.Title>
        <fieldset className="Modal-Fieldset">
          <label className="Modal-Label" htmlFor="modal-input">
            {description}
          </label>
          <br />
          <input
            className="Modal-Input"
            id="modal-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </fieldset>
        <fieldset className="Modal-Fieldset">
          <label className="Modal-Label" htmlFor="modal-location-input">
            {locationLabel}
          </label>
          <br />
          <input
            className="Modal-Input"
            id="modal-location-input"
            value={locationEvent}
            onChange={(e) => setLocation(e.target.value)}
          />
        </fieldset>
        <fieldset className="Modal-Fieldset">
          <label className="Modal-Label" htmlFor="modal-link-input">
            {linkLabel}
          </label>
          <br />
          <input
            className="Modal-Input"
            id="modal-link-input"
            value={linkEvent}
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
        <fieldset className="Modal-Fieldset">
          <label className="Modal-Label" htmlFor="modal-date-picker">
            {dateLabel}
          </label>
          <br />
          <DatePicker
            className="Modal-DatePicker"
            id="modal-date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={new Date()}
            placeholderText="Select a date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            fixedHeight
            isClearable={true}
            inline
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className="Button green" onClick={handleConfirm}>
              {confirmText}
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="Modal-IconButton"
            aria-label="Close"
            onClick={handleClose}
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ModalInput;
