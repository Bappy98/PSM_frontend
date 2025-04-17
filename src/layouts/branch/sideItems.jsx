import { HomeRepairServiceOutlined, ImportContactsOutlined } from "@mui/icons-material";


export const sidebarItems = [
    {
      icon: <ImportContactsOutlined />,
      label: "Dashboard",
      dropdown:false,
      linkto:"/dashboard"
    },
    {
      icon: <ImportContactsOutlined />,
      label: "Stock",
      dropdown:false,
      linkto:"/stock-dashboard"
    },
    {
      icon: <ImportContactsOutlined />,
      label: "Medicine req",
      dropdown:false,
      linkto:"/medicine-req"
    },
    {
      icon: <ImportContactsOutlined />,
      label: "Users",
      dropdown:false,
      linkto:"/users"
    },
    {
      icon: <ImportContactsOutlined />,
      label: "Branch",
      dropdown:false,
      linkto:"/branches"
    },
    {
      icon: <HomeRepairServiceOutlined />,
      label: "Company",
      dropdown: false,
      linkto:"/company-list"
    },
    {
      icon: <HomeRepairServiceOutlined />,
      label: "Medicine",
      dropdown: false,
      linkto:"/medicine-list"
    },
    // Add more items as needed
  ];