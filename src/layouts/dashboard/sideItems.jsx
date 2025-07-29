import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PeopleIcon from '@mui/icons-material/People';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';


export const sidebarItems = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      dropdown:false,
      linkto:"/dashboard"
    },
    {
      icon: <ShowChartIcon />,
      label: "Stock",
      dropdown:false,
      linkto:"/stock-dashboard"
    },
    {
      icon: <LiveHelpIcon />,
      label: "Medicine req",
      dropdown:false,
      linkto:"/medicine-req"
    },
    {
      icon: <PeopleIcon />,
      label: "Users",
      dropdown:false,
      linkto:"/users"
    },
    {
      icon: <MapsHomeWorkIcon />,
      label: "Branch",
      dropdown:false,
      linkto:"/branches"
    },
    {
      icon: <AddBusinessIcon />,
      label: "Company",
      dropdown: false,
      linkto:"/company-list"
    },
    {
      icon: <VaccinesIcon />,
      label: "Medicine",
      dropdown: false,
      linkto:"/medicine-list"
    },
    // {
    //   icon: <VaccinesIcon />,
    //   label: "Order",
    //   dropdown: false,
    //   linkto:"/order-list"
    // },
    // Add more items as needed
  ];

  export const BranchItem = [
    
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        dropdown:false,
        linkto:"/branch"
      },
      {
        icon: <DashboardIcon />,
        label: "Store",
        dropdown:false,
        linkto:"/branchStore"
      },
      {
        icon: <DashboardIcon />,
        label: "Sell",
        dropdown:false,
        linkto:"/sell"
      },
    
  ]