import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";
import "../assets/styles/workspace.css";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../services/AuthContext";
import { Link } from "react-cmdk/dist/components/ListItem";

const DropdownMenuApp = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();

  const userId = localStorage.getItem("uid");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSettings = () => {
    navigate(`/${userId}/settings`);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="IconButton"
          aria-label="Settings and Logout Dropdown"
        >
          <HamburgerMenuIcon style={{ width: "25px", height: "25px" }} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          
            <DropdownMenu.Item className="DropdownMenuItem" onClick={handleSettings}>
              Settings
              <div className="RightSlot">
                <GearIcon />
              </div>
            </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenu.Separator" />
          <DropdownMenu.Item
            className="DropdownMenuItem Logout"
            onClick={handleLogout}
          >
            Logout
            <div className="RightSlot">
              <ExitIcon />
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuApp;
