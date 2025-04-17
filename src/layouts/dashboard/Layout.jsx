import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="">
      <Topbar sidebarCollapsed={sidebarCollapsed} sx={{}} />
      <Box sx={{ display: "flex" }}>
        <Sidebar onCollapseChange={handleSidebarCollapseChange} />;
        <Box
          className="content"
          sx={{
            flexGrow: 1,
            marginTop: "90px",
            padding: "15px",
            transition: "margin-left 0.3s ease",
            backgroundColor:"#c2d7f3",
            minHeight:"88vh"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
