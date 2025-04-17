import Button from "@/components/Button/Button";
import DataGrid from "@/components/shared/dataTable/DataGrid";
import { getUsers } from "@/store/api/users/usersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const COLUMN = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1,
    },
    {
      Header: "User Name",
      accessor: (row) => row?.name,
    },
    {
      Header: "Email",
      accessor: (row) => row?.email,
    },
    {
      Header: "User Type",
      accessor: (row) => row?.userType,
    },
  ];
  console.log(users);
  

  return (
    <div>
      <Button link={'/branch-register'}>Branch register</Button>
      <DataGrid column={COLUMN} data={users} />
    </div>
  );
}

export default Users;
