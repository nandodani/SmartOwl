import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  CircleIcon,
  Cross1Icon,
  DiscIcon,
  DotFilledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  fetchReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../services/firebase";
import AlertDialogDemo from "./alert";
import DialogDemo from "./modal-input-date";
import moment from "moment";
import { serverTimestamp } from "firebase/firestore";

function Rectangle() {
  const [reminders, setReminders] = useState([]);
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [newReminderTitle, setNewReminderTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletingReminderId, setDeletingReminderId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const getReminders = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const remindersData = await fetchReminders(userId, workspaceId);
    console.log("Reminders Data: ", remindersData);
    setReminders(remindersData);
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setNewReminderTitle("");
    setReminderDate("");
  };

  const handleEditModalOpen = (reminderId, reminderTitle, reminderDate) => {
    setEditingReminderId(reminderId);
    setEditingTitle(reminderTitle);
    setReminderDate(reminderDate);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditingReminderId(null);
    setEditingTitle("");
    setReminderDate("");
    setShowEditModal(false);
  };

  const handleCreateReminder = async (reminderTitle, reminderDate) => {
    if (reminderTitle.trim() !== "") {  
      
      const newReminder = {
        title: reminderTitle,
        completed: false,
        date: reminderDate,
      };
      console.log(newReminder);
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      const reminderId = await createReminder(userId, workspaceId, newReminder);
      const updatedReminders = [
        ...reminders,
        { id: reminderId, ...newReminder },
      ];
      setReminders(updatedReminders);
      setNewReminderTitle("");
      setReminderDate("");
      setShowCreateModal(false);
    }
    getReminders()
  };

  const handleReminderCompletion = async (reminderId, completed) => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    await updateReminder(userId, workspaceId, reminderId, { completed });
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === reminderId) {
        return { ...reminder, completed };
      }
      return reminder;
    });
    setReminders(updatedReminders);
    await getReminders();
  };

  const handleDeleteAlertOpen = (reminderId) => {
    setDeletingReminderId(reminderId);
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeletingReminderId(null);
    setShowDeleteAlert(false);
  };

  const handleDeleteReminder = async () => {
    if (deletingReminderId) {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await deleteReminder(userId, workspaceId, deletingReminderId);
      const updatedReminders = reminders.filter(
        (reminder) => reminder.id !== deletingReminderId
      );
      setReminders(updatedReminders);
      setDeletingReminderId(null);
      setShowDeleteAlert(false);
    }
  };

  const handleEditReminder = async (reminderId, reminderTitle, reminderDate) => {
    if (reminderTitle.trim() !== "") {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await updateReminder(userId, workspaceId, reminderId, {
        title: reminderTitle,
        date: reminderDate,
      });
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === reminderId) {
          return { ...reminder, title: reminderTitle, date: reminderDate };
        }
        return reminder;
      });
      setReminders(updatedReminders);
      handleEditModalClose();
    }
    getReminders()
  };

  

  useEffect(() => {
    getReminders();
  }, []);

  const formatTimeRemaining = (date) => {
    const end = moment.unix(date.seconds);
    const time = end.fromNow();
    console.log(time);
    if (time.includes("ago")) {
      return time.replace(time, "Expired");
    }
    return time;
  };

  return (
    <div className="task-rectangle rectangle">
      <div className="rectangle-title d-flex align-items-center">
        <h3>Reminders</h3>
        <button onClick={handleCreateModalOpen} className="create-icon">
          <PlusIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
      <div className="tasks">
        {reminders.map((reminder) => (
          <div
            className="check-task rectangle-item"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            key={reminder.id}
          >
            <Checkbox.Root
              className="ReminderCheckboxRoot"
              checked={reminder.completed}
              onCheckedChange={(isChecked) =>
                handleReminderCompletion(reminder.id, isChecked)
              }
              id={`checkbox-${reminder.id}`}
            >
              <Checkbox.Indicator
                style={{
                  backgroundColor: reminder.completed ? "#3a4d51" : "white",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className="ReminderCheckboxIndicator"
              >
                <DotFilledIcon
                  style={{ color: "white", width: "100%", height: "100%" }}
                />
              </Checkbox.Indicator>
            </Checkbox.Root>
            {editingReminderId === reminder.id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              </div>
            ) : (
              <div
                style={{ width: "100%", marginRight: "10px" }}
                className="d-flex align-items-center"
              >
                <label
                  className="Label"
                  style={{
                    width: "100%",
                    textDecoration: reminder.completed
                      ? "line-through"
                      : "none",
                    opacity: reminder.completed ? "0.5" : "1",
                  }}
                  onClick={() =>
                    handleEditModalOpen(reminder.id, reminder.title)
                  }
                >
                  {reminder.title}
                </label>{" "}
                <span
                  style={{
                    width: "35%",
                    textAlign: "right",
                    marginRight: "0",
                    opacity: 0.5,
                  }}
                >
                  {" "}
                  {reminder.completed
                    ? "Done"
                    :  formatTimeRemaining(reminder.date)}{" "}
                </span>
              </div>
            )}
            {editingReminderId !== reminder.id && (
              <button
                onClick={() => handleDeleteAlertOpen(reminder.id)}
                className="delete-icon"
              >
                <Cross1Icon style={{ width: "25px", height: "25px" }} />
              </button>
            )}
          </div>
        ))}
      </div>
      {showCreateModal && (
        <DialogDemo
          title="New Reminder"
          description="Enter the new reminder title:"
          confirmText="Create"
          onClose={handleCreateModalClose}
          onConfirm={(reminderTitle, reminderDate) =>
            handleCreateReminder(reminderTitle, reminderDate)
          }
          open={showCreateModal}
        />
      )}
      {showEditModal && (
        <DialogDemo
          title="Edit Reminder"
          description="Enter the updated reminder title:"
          confirmText="Save"
          onClose={handleEditModalClose}
          onConfirm={(reminderTitle, reminderDate) =>
            handleEditReminder(editingReminderId, reminderTitle, reminderDate)
          }
          open={showEditModal}
          initialValue={editingTitle}
          date={reminderDate}
        />
      )}
      {showDeleteAlert && (
        <AlertDialogDemo
        title="Delete Reminder"
        description="Are you sure you want to delete this reminder?"
        confirmText="Delete"
        onCancel={handleDeleteAlertClose}
        onConfirm={handleDeleteReminder}
        open={showDeleteAlert}
      />
      )}
      
    </div>
  );
}

export default Rectangle;
