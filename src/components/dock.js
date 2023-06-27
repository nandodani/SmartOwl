import React, { useEffect, useState } from "react";
import "../assets/styles/dock.css";
import {
  CheckIcon,
  GearIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  fetchQuickLinks,
  createQuickLink,
  deleteQuickLink,
} from "../services/firebase";
import ModalInput from "./modal-input";
import AlertDialogDemo from "./alert";

const DockLinks = () => {
  const [links, setLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletingQuickLinkId, setDeletingQuickLinkId] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const getLinks = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const linksData = await fetchQuickLinks(userId, workspaceId);
    console.log("Links Data: ", linksData);
    setLinks(linksData);
  };

  useEffect(() => {
    getLinks();
    console.log("Links: ", links);
  }, []);

  const handleCreateLink = async (urlLink) => {
    if (urlLink.trim() !== "") {
      const newLink = {
        link: urlLink,
        createdAt: new Date(),
      };
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      const quickLinkId = await createQuickLink(userId, workspaceId, newLink);
      const updatedQuickLinks = [...links, { id: quickLinkId, ...newLink }];
      setLinks(updatedQuickLinks);
      setIsModalOpen(false);
    }
    getLinks();
  };

  const showDeleteIconDock = (quickLinkId) => {
    setShowDeleteIcon(true);
  };

  const hideDeleteIconDock = () => {
    setShowDeleteIcon(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewLink("");
  };

  const handleDeleteLink = async () => {
    if (deletingQuickLinkId) {
      const userId = localStorage.getItem("uid");
      const workspaceId = localStorage.getItem("WorkspaceId");
      await deleteQuickLink(userId, workspaceId, deletingQuickLinkId);
      const updatedLinks = links.filter(
        (link) => link.id !== deletingQuickLinkId
      );
      setLinks(updatedLinks);
      closeModal();
      getLinks();
    }
  };

  const handleDeleteAlertOpen = (quickLinkId) => {
    setDeletingQuickLinkId(quickLinkId);
    setShowDeleteAlert(true);
  };

  const handleDeleteAlertClose = () => {
    setDeletingQuickLinkId(null);
    setShowDeleteAlert(false);
  };

  return (
    <>
      <div className="dock-container">
        <div className="dock">
          {" "}
          {links.map((link, index) => (
            <>
              <div className="icon" key={index}>
                <a
                  href={`https://${link.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "25px", height: "25px" }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${link.link}&sz=256`}
                    alt="Ícone 4"
                    title={link.link}
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  />
                </a>

                {showDeleteIcon && (
                  <button
                    className="docksettings-icon"
                    onClick={() => handleDeleteAlertOpen(link.id)}
                  >
                    <TrashIcon style={{ width: "25px", height: "25px" }} />
                  </button>
                )}
              </div>
              <div className="divider" />
            </>
          ))}
          {links.length < 10 && (
            <>
              <button className="docksettings-icon" onClick={openModal}>
                <PlusIcon style={{ width: "25px", height: "25px" }} />
              </button>
              <div className="divider" />
            </>
          )}
          <div className="dock-settings-buttons">
            {showDeleteIcon ? (
              <button
                className="docksettings-icon"
                onClick={hideDeleteIconDock}
              >
                <CheckIcon style={{ width: "25px", height: "25px" }} />
              </button>
            ) : (
              <button
                className="docksettings-icon"
                onClick={showDeleteIconDock}
              >
                <GearIcon style={{ width: "25px", height: "25px" }} />
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalInput
          title="Add Link"
          description="Enter a link:"
          confirmText="Save"
          onClose={closeModal}
          onConfirm={handleCreateLink}
          open={isModalOpen}
        />
      )}
      {showDeleteAlert && (
        <AlertDialogDemo
          title="Delete Link"
          description="Are you sure you want to delete this link?"
          confirmText="Delete"
          onCancel={handleDeleteAlertClose}
          onConfirm={handleDeleteLink}
          open={showDeleteAlert}
        />
      )}
    </>
  );
};

export default DockLinks;
