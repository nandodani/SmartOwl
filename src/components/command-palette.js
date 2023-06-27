import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import "../assets/styles/command-palette.css";
import {
  CircleIcon,
  ExitIcon,
  GearIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../services/AuthContext";
import { fetchQuickLinks } from "../services/firebase";
import googleIcon from "../assets/images/google-icon.png";

const CommandPalette = ({ workspaces = [], onSelectWorkspace }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [showGoogleIcon, setShowGoogleIcon] = useState(false);

  const userId = localStorage.getItem("uid");

  const navigate = useNavigate();
  const { logout } = UserAuth();

  const getLinks = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const linksData = await fetchQuickLinks(userId, workspaceId);
    console.log("Links Data: ", linksData);
    setLinks(linksData);
  };

  const handleWorkspaceClick = (workspaceId, index) => {
    onSelectWorkspace(workspaceId, index);
    localStorage.setItem("WorkspaceId", workspaceId);
    console.log(
      "Workspace selecionado:",
      workspaceId + "Esta é a posição do botão:" + index
    );
    navigate(`/${userId}/workspace/${workspaceId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Dados no Selector:", workspaces);
    getLinks();
    const handleKeyDown = (event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (value, event) => {
    setSearch(value);
    setShowGoogleIcon(value.startsWith("google "));

    if (event && event.key === "Enter" && value.startsWith("google ")) {
      const query = value.slice(7); // Remove 'google ' from the beginning
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <div className="overlay">
        <div className="command-palette">
          <Command.Input
            className="command-palette-input"
            placeholder="Search..."
            value={search}
            onValueChange={(value) => setSearch(value)}
            onKeyDown={(event) => handleSearch(search, event)}
            autoFocus
            style={{
              backgroundImage: showGoogleIcon ? `url(${googleIcon})` : "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundSize: "auto 60%",
              margin: "0px 10px 0px 10px",
              paddingLeft: showGoogleIcon ? "40px" : "0px",
              transition: "padding-left 0.2s ease-in-out",
            }}
          />
          <Command.Separator className="command-palette-separator" />
          <Command.List className="command-palette-list">
            <Command.Item
              className="command-palette-item"
              onSelect={() => console.log("Person")}
            >
              <PersonIcon
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Google Search
            </Command.Item>
            <Command.Group heading="Workspace">
              {workspaces.length > 0 &&
                workspaces.map((workspace, index) => (
                  <Command.Item
                    className="command-palette-item"
                    key={workspace.id}
                    onClick={() => handleWorkspaceClick(workspace.id, index)}
                    onSelect={() => handleWorkspaceClick(workspace.id, index)}
                    style={{}}
                  >
                    <CircleIcon
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    {workspace.workspaceName}
                  </Command.Item>
                ))}
              <Command.Item
                className="command-palette-item"
                onSelect={() => navigate("/setup")}
              >
                <PlusIcon
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Setup new workspace
              </Command.Item>
            </Command.Group>
            {links.length > 0 && (
              <Command.Group heading="Quick Links">
                {links.map((link, index) => (
                  <Command.Item
                    className="command-palette-item"
                    onSelect={() => console.log("Link 1")}
                    key={index}
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${link.link}&sz=256`}
                      alt="Ícone 4"
                      title={link.link}
                      style={{
                        borderRadius: "4px",
                        backgroundColor: "white",
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    {link.link}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Settings">
              <Command.Item
                className="command-palette-item"
                onSelect={() => navigate(`/${userId}/settings`)}
              >
                <GearIcon
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Settings
              </Command.Item>
              <Command.Item
                className="command-palette-item-logout"
                onSelect={handleLogout}
                onClick={handleLogout}
              >
                <ExitIcon
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Logout{" "}
              </Command.Item>
            </Command.Group>
            <Command.Empty>No results found for "{search}".</Command.Empty>
          </Command.List>
        </div>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
