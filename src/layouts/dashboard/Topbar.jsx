import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Badge,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import avatarIcon from "../../assets/BRKK.svg";
import { Link } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import { logOut, selectCurrentUser } from "../../store/api/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/api/user/userSlice";

const Topbar = ({ sidebarCollapsed }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userId = useSelector(selectCurrentUser)
  const { user, loading, error } = useSelector((state) => state.user);
 // console.log(user);
  
  React.useEffect(()=>{
    if(userId) {
      dispatch(getUser({user_id:userId}))
    }
  },[dispatch,userId])

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(
      logOut({
        accessToken: null,
        user_id: null,
      })
    );
  };

  return (
    <AppBar
      position="fixed"
      component="div"
      className="wrapperr"
      sx={{
        p: 1,
        width: `calc(100% - ${sidebarCollapsed ? 64 : 240}px)`,
        marginLeft: sidebarCollapsed ? 64 : 240,
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={avatarIcon} className="h-16 w-16" alt="" />
        </Box>
        <Box>
          <IconButton color="black" component={Link} to="/notifications">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
            <Box sx={{ flexGrow: 1, ml: 1 }}>
              <Typography style={{ fontSize: "0.875rem", color: "black" }}>
                {user?.name}
              </Typography>
            </Box>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleLogOut}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
