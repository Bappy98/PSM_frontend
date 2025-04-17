import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { sidebarItems,BranchItem } from "./sideItems";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentUserType } from "@/store/api/auth/authSlice";

const Sidebar = ({ onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [items,setItems] = useState([])

  const userType = useSelector(selectCurrentUserType)
  useEffect(()=>{
    if(userType==='branch') {
      setItems(BranchItem)
    }
    else if(userType ==='superadmin') {
      setItems(sidebarItems)
    }
  },[items,userType])
  
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange && onCollapseChange(newState);
    if (newState) {
      setOpenDropdowns({});
    }
  };

  const handleClick = (index) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Drawer
      sx={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 240,
          boxSizing: "border-box",
          marginTop: "4px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button onClick={toggleCollapse}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>

         
        </ListItem>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.dropdown ? (
              <React.Fragment>
                <ListItem button onClick={() => handleClick(index)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {openDropdowns[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={!collapsed && openDropdowns[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <Link to={dropdownItem.linkTo} key={subIndex}>
                        <ListItem button className="left-3">
                          <ListItemIcon>{dropdownItem.dropIcon}</ListItemIcon>
                          <ListItemText primary={dropdownItem.label} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <Link to={item.linkto} key={index}>
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </Link>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
