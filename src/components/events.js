import React, { useEffect, useState } from "react";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/firebase";
import "../assets/styles/workspace.css";
import Modal from "./modal-input-events";
import {
  PlusIcon,
  CheckIcon,
  Cross1Icon,
  CalendarIcon,
  Link2Icon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { serverTimestamp } from "firebase/firestore";
import AlertDialogDemo from "./alert";
import * as Tooltip from "@radix-ui/react-tooltip";
import moment from "moment";
import { Link } from "react-router-dom";

function Rectangle() {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingDate, setEditingDate] = useState("");
  const [editingLocation, setEditingLocation] = useState("");
  const [editingLink, setEditingLink] = useState("");

  const getEvents = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const eventsData = await fetchEvents(userId, workspaceId);
    console.log("Events Data: ", eventsData);
    setEvents(eventsData);
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setNewEventTitle("");
  };

  const handleEditModalOpen = (
    eventId,
    eventTitle,
    eventLocation,
    eventLink,
    eventDate
  ) => {
    setEditingEventId(eventId);
    setEditingTitle(eventTitle);
    setEditingDate(eventDate);
    setEditingLocation(eventLocation);
    setEditingLink(eventLink);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditingEventId(null);
    setEditingTitle("");
    setShowEditModal(false);
  };

  const handleCreateEvent = async (
    eventTitle,
    eventLocation,
    eventLink,
    eventDate
  ) => {
    if (eventTitle.trim() !== "") {
      const newEvent = {
        title: eventTitle,
        location: eventLocation,
        link: eventLink,
        date: eventDate,
        completed: false,
        createdAt: serverTimestamp(),
      };
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      const eventId = await createEvent(userId, workspaceId, newEvent);
      const updatedEvents = [...events, { id: eventId, ...newEvent }];
      setEvents(updatedEvents);
      setNewEventTitle("");
      setShowCreateModal(false);
    }
  };

  const handleEventCompletion = async (eventId, completed) => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    await updateEvent(userId, workspaceId, eventId, { completed });
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        setCompleted(true);
        return { ...event, completed };
      }

      return event;
    });
    setEvents(updatedEvents);
    await getEvents();
  };

  const handleDeleteAlertOpen = (eventId) => {
    setDeletingEventId(eventId);
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeletingEventId(null);
    setShowDeleteAlert(false);
  };

  const handleDeleteEvent = async () => {
    if (deletingEventId) {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await deleteEvent(userId, workspaceId, deletingEventId);
      const updatedEvents = events.filter(
        (event) => event.id !== deletingEventId
      );
      setEvents(updatedEvents);
      setDeletingEventId(null);
      setShowDeleteAlert(false);
    }
  };

  const handleEditEvent = async (
    eventId,
    eventTitle,
    eventLocation,
    eventLink,
    eventDate
  ) => {
    if (eventTitle.trim() !== "") {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await updateEvent(userId, workspaceId, eventId, { title: eventTitle });
      const updatedEvents = events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            title: eventTitle,
            location: eventLocation,
            link: eventLink,
            date: eventDate,
          };
        }
        return event;
      });
      setEvents(updatedEvents);
      handleEditModalClose();
    }
  };

  const convertToDate = (seconds) => {
    const milliseconds = seconds * 1000;
    const date = moment(milliseconds).format("DD/MM/YYYY - HH:mm");
    return date;
  };

  const eventsWithFormattedDate = events.map((event) => {
    return {
      ...event,
      formattedDate: convertToDate(event.date.seconds),
    };
  });

  useEffect(() => {
    getEvents();
    console.log("Eventos com data: ", eventsWithFormattedDate);
  }, []);
  return (
    <div className="rectangle">
      <div className="rectangle-title d-flex">
        <h3>Events</h3>
        <button onClick={handleCreateModalOpen} className="create-icon">
          <PlusIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
      <div className="">
        <ul>
          {eventsWithFormattedDate.map((event) => (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <li
                    key={event.id}
                    className="rectangle-item d-flex align-items-center justify-content-between"
                  >
                    <p>
                      {event.title} <br />
                      <span style={{ opacity: 0.5 }}>
                        {event.formattedDate}
                      </span>
                    </p>
                    <div
                      className="rectangle-buttons d-flex"
                      style={{ gap: "10px" }}
                    >
                      <button
                        onClick={() =>
                          handleEventCompletion(event.id, completed)
                        }
                        className="done-icon"
                      >
                        <CheckIcon style={{ width: "25px", height: "25px" }} />
                      </button>{" "}
                      <button
                        onClick={() => handleDeleteAlertOpen(event.id)}
                        className="delete-icon"
                      >
                        <Cross1Icon style={{ width: "25px", height: "25px" }} />
                      </button>
                    </div>
                  </li>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="TooltipContent" side="bottom">
                    <div className="tooltip-content">
                      {" "}
                      <h6>{event.title}</h6>
                      <hr />
                      <span className="d-flex">
                        {" "}
                        <SewingPinFilledIcon
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: "15px",
                          }}
                        />
                        <p>Location: {event.location}</p>
                      </span>
                      <span className="d-flex">
                        {" "}
                        <Link2Icon
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: "15px",
                          }}
                        />
                        <a
                          href={`https://${event.link}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {event.link}
                        </a>
                      </span>
                      <span className="d-flex">
                        {" "}
                        <CalendarIcon
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: "15px",
                          }}
                        />
                        <p>{event.formattedDate}</p>
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleEditModalOpen(
                          event.id,
                          newEventTitle,
                          eventDate,
                          eventLocation,
                          eventLink
                        )
                      }
                      className="done-icon"
                    >
                      <CheckIcon style={{ width: "25px", height: "25px" }} />
                    </button>
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        </ul>
      </div>
      {showDeleteAlert && (
        <AlertDialogDemo
          title="Delete Event"
          description="Are you sure you want to delete this event?"
          confirmText="Delete"
          onCancel={handleDeleteAlertClose}
          onConfirm={handleDeleteEvent}
          open={showDeleteAlert}
        />
      )}
      {showCreateModal && (
        <Modal
          title="New Event"
          description="Enter the new event title:"
          locationLabel="Enter the location of the event:"
          linkLabel="Enter the link of the event:"
          confirmText="Create"
          onClose={handleCreateModalClose}
          onConfirm={handleCreateEvent}
          open={showCreateModal}
        />
      )}
      {showEditModal && (
        <Modal
          title="Edit Reminder"
          description="Enter the updated event title:"
          confirmText="Save"
          onClose={handleEditModalClose}
          onConfirm={(eventTitle, eventDate, eventLocation, eventLink) =>
            handleEditEvent(
              editingEventId,
              eventTitle,
              eventDate,
              eventLocation,
              eventLink
            )
          }
          open={showEditModal}
          initialValue={editingTitle}
          date={editingDate}
          location={editingLocation}
          link={editingLink}
        />
      )}
    </div>
  );
}

export default Rectangle;
