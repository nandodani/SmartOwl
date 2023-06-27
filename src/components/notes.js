import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/firebase";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { serverTimestamp } from "firebase/firestore";
import AlertDialogDemo from "./alert";

function Rectangle() {
  const [notes, setNotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [creatingNote, setCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const getNotes = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const notesData = await fetchNotes(userId, workspaceId);
    setNotes(notesData);
  };

  const handleEditTitle = async (noteId, noteTitle) => {
    try {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await updateNote(userId, workspaceId, noteId, { title: noteTitle });
      const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, title: noteTitle };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.log("Error updating note title: ", error);
    }
  };

  const handleEditText = async (noteId, noteText) => {
    try {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await updateNote(userId, workspaceId, noteId, { text: noteText });
      const updatedNotes = notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, text: noteText };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.log("Error updating note text: ", error);
    }
  };

  const handleDeleteNote = (noteId) => {
    const noteToDelete = notes.find((note) => note.id === noteId);
    setNoteToDelete(noteToDelete);
    setShowDeleteAlert(true);
  };

  const handleDeleteTask = async () => {
    if (noteToDelete) {
      try {
        const userId = localStorage.getItem("uid");
        const workspaceId = localStorage.getItem("WorkspaceId");
        await deleteNote(userId, workspaceId, noteToDelete.id);
        const updatedNotes = notes.filter((note) => note.id !== noteToDelete.id);
        setNotes(updatedNotes);
        setCurrentIndex((prevIndex) =>
          prevIndex === updatedNotes.length ? prevIndex - 1 : prevIndex
        );
      } catch (error) {
        console.log("Error deleting note: ", error);
      }
    }
    setShowDeleteAlert(false);
    setNoteToDelete(null);
  };

  const handleCreateNote = async () => {
    try {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      const newNote = await createNote(userId, workspaceId, {
        title: newNoteTitle,
        text: newNoteText,
        createdAt: serverTimestamp(),
      });
      setNotes([...notes, newNote]);
      setCreatingNote(false);
      setNewNoteTitle("");
      setNewNoteText("");
    } catch (error) {
      console.log("Error creating note: ", error);
    }
  };

  const handleCancelNote = () => {
    setNewNoteTitle("");
    setNewNoteText("");
    setCreatingNote(false);
  };

  const goToPreviousNote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? notes.length - 1 : prevIndex - 1
    );
  };

  const goToNextNote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === notes.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="rectangle task-rectangle">
      <div className="rectangle-title d-flex">
        <h3>Notes</h3>
        <div
          className="buttons-notes d-flex"
          style={{ gap: "10px", marginLeft: "auto", marginRight: "0" }}
        >
          <button
            className="delete-icon"
            onClick={() => handleDeleteNote(notes[currentIndex].id)}
          >
            <Cross1Icon style={{ width: "25px", height: "25px" }} />
          </button>
          <button
            className="create-icon"
            onClick={() => setCreatingNote(true)}
          >
            <PlusIcon style={{ width: "25px", height: "25px" }} />
          </button>
        </div>
      </div>
            <div className="carousel-controls">
        <button onClick={goToPreviousNote}  className="carousel-control-button-left">
          <ArrowLeftIcon className="carousel-control-icon" />
        </button>
        <button onClick={goToNextNote} className="carousel-control-button-right">
          <ArrowRightIcon className="carousel-control-icon" />
        </button>
      </div>
      {creatingNote ? (
        <div className="create-note-form">
          <input
            type="text"
            className="note-title"
            placeholder="Note Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Note Text"
            className="note-text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
          <button className="create-note" onClick={handleCreateNote}>Create Note</button>
          <button className="cancel-note"  onClick={handleCancelNote}>Cancel</button>
        </div>
      ) : (
        notes.length > 0 && (
          <div className="notes mt-2">
            {notes[currentIndex].editingTitle ? (
              <input
                placeholder="Note Title"
                className="note-title"
                type="text"
                value={notes[currentIndex].title}
                onChange={(e) =>
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, title: e.target.value };
                      }
                      return note;
                    })
                  )
                }
                onBlur={async () => {
                  const noteId = notes[currentIndex].id;
                  const noteTitle = notes[currentIndex].title;
                  await handleEditTitle(noteId, noteTitle);
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, editingTitle: false };
                      }
                      return note;
                    })
                  );
                }}
              />
            ) : (
              <h5
                onClick={() =>
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, editingTitle: true };
                      }
                      return note;
                    })
                  )
                }
              >
                {notes[currentIndex].title}
              </h5>
            )}
            {notes[currentIndex].editingText ? (
              <textarea
                style={{ height: "100px", width: "100%" }}
                value={notes[currentIndex].text}
                onChange={(e) =>
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, text: e.target.value };
                      }
                      return note;
                    })
                  )
                }
                onBlur={async () => {
                  const noteId = notes[currentIndex].id;
                  const noteText = notes[currentIndex].text;
                  await handleEditText(noteId, noteText);
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, editingText: false };
                      }
                      return note;
                    })
                  );
                }}
              />
            ) : (
              <p
                style={{ width: "100%", height: "100%" }}
                onClick={() =>
                  setNotes((prevNotes) =>
                    prevNotes.map((note, index) => {
                      if (index === currentIndex) {
                        return { ...note, editingText: true };
                      }
                      return note;
                    })
                  )
                }
              >
                {notes[currentIndex].text}
              </p>
            )}
          </div>
        )
      )}
      {showDeleteAlert && (
        <AlertDialogDemo
          title="Delete Note"
          description="Are you sure you want to delete this note?"
          confirmText="Delete"
          onCancel={() => setShowDeleteAlert(false)}
          onConfirm={handleDeleteTask}
          open={showDeleteAlert}
        />
      )}
    </div>
  );
}

export default Rectangle;
