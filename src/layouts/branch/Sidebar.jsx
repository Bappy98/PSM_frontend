import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { sidebarItems as items } from "./sideItems";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";

const Sidebar = ({ onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange && onCollapseChange(newState);

    // When collapsing, close all dropdowns
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

          {!collapsed && (
            <ListItemText
              className="bg-green-900 text-white text-center rounded py-1  font-extrabold uppercase"
              primary="PSM"
            />
          )}
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
