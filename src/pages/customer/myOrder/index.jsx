import CashTable from "@/components/shared/dataTable/CashTable";
import SellTable from "@/components/shared/dataTable/SellTable";
import { selectCurrentUser } from "@/store/api/auth/authSlice";
import { getMyOrder } from "@/store/api/myOrder/myOrderSlice";
import fetchWrapper from "@/util/fetchWrapper";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.myOrder);
  console.log(myOrder);
  
  const userId = useSelector(selectCurrentUser);
  const navigate = useNavigate()
  const OrderSort = myOrder?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const singleOrder = async ( id ) => {
    try {
      const  {data}  = await fetchWrapper.get(`/order/${id}`);    
      navigate('/single-order',{ state:  {data}  })
      
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      dispatch(getMyOrder({ userId }));
    }
  }, [dispatch, userId]);
  const COLUMN = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1,
    },
    {
      Header: "Invoice",
      accessor: (row) => row.invoice,
    },
    {
      Header: "Item",
      accessor: (row) => row.medicines.length,
    },
    {
      Header: "Total Charge",
      accessor: (row) => row.total,
    },
    {
      Header: "Status",
      accessor: (row) => row.status,
    },
    {
      Header: "Time",
      accessor: (row) => row.createdAt.toString(),
    },
    {
      Header: "View",
      Cell: ({ row }) => {
        return (
          <button
            className="z-50"
             onClick={() => singleOrder(row.original._id)}
          >
            <Icon icon="heroicons-eye" />
          </button>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto mt-5">
      <CashTable data={OrderSort} column={COLUMN} />
    </div>
  );
}

export default MyOrder;
