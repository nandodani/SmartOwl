import "../assets/styles/alert.css";
import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const AlertDialogDemo = ({ title, description, confirmText, onCancel, onConfirm }) => {
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
      <AlertDialog.Title className="AlertDialogTitle">{title}</AlertDialog.Title>

        <AlertDialog.Description className="AlertDialogDescription">
          {description}
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={handleCancel}>
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="Button red" onClick={handleConfirm}>
              {confirmText}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AlertDialogDemo;
