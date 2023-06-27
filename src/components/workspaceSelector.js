import React, { useEffect, useState } from "react";
import { PlusCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";

export default function WorkspaceList({ workspaces = [], onSelectWorkspace }) {
  const userId = localStorage.getItem("uid");
  const navigate = useNavigate();

  const handleWorkspaceClick = (workspaceId, index) => {
    onSelectWorkspace(workspaceId, index);
    localStorage.setItem("WorkspaceId", workspaceId);
    console.log(
      "Workspace selecionado:",
      workspaceId + "Esta é a posição do botão:" + index
    );
  };

  console.log("Dados no Selector:", workspaces);
  return (
    <div className="WorkspaceSelector">
      <div className="WorkspacesUser">
        {workspaces.length > 0 &&
          workspaces.map((workspace, index) => (
            <Link
              key={workspace.id}
              to={`/${userId}/workspace/${workspace.id}`}
              onClick={() => handleWorkspaceClick(workspace.id, index)}
              style={{}}
            >
              <CircleIcon
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                  marginRight: "15px",
                }}
              />
            </Link>
          ))}
      </div>
      <div className="WorkspacesCreate">
        <div className="verticalDivider" style={{ marginRight: "15px" }}></div>
        <Link to="/setup">
          <PlusCircledIcon
            className="PlusIcon"
            style={{
              color: "white",
              opacity: 0.5,
              width: "20px",
              height: "20px",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
