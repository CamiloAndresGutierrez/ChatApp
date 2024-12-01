"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useBoundStore } from "../store";
import localStorage from "../utils/localStorage";

export default function Navbar() {
  const { user } = useBoundStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeAuthToken()
    window.location.reload();
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="justify-between max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <Typography variant="h6" className="text-white font-bold">
            Chat App
          </Typography>
        </Link>
        <div className="flex items-center">
          <Typography variant="body1" className="mr-4">
            {user.name}
          </Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </Avatar>
          </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <ButtonBase onClick={handleLogout}>
              <LogoutIcon className="mr-2 h-4 w-4" />
              Logout
            </ButtonBase>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
