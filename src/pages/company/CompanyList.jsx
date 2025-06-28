import { useGetCompanyQuery } from "@/store/api/company/companyApiSlice";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import DataGrid from "@/components/shared/dataTable/DataGrid";
import Loading from "@/components/shared/Loading";
import { useNavigate } from "react-router-dom";
import fetchWrapper from "@/util/fetchWrapper";

function CompanyList() {
  const { data } = useGetCompanyQuery();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
   
    if (data) {
      setCompanies(data);
    }
  }, [data]);

 useEffect(() => {
  const hasReloaded = sessionStorage.getItem("hasReloaded");

  if (!hasReloaded) {
    sessionStorage.setItem("hasReloaded", "true");
    window.location.reload();
  }
}, []);
useEffect(() => {
  return () => {
    sessionStorage.removeItem("hasReloaded");
  };
}, []);


  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await fetchWrapper.delete(`/company/${selectedId}`);
        setShowModal(false);
        setSelectedId(null);
        setCompanies(
          companies.filter((medicine) => medicine._id !== selectedId)
        );
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const COLUMNS = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1, // Counter column
    },
    {
      Header: "Name",
      accessor: "name", // Simple accessor for sorting
    },
    {
      Header: "Address",
      accessor: "address", // Simple accessor for sorting
    },
    {
      Header: "Phone",
      accessor: "phone", // Simple accessor for sorting
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-5">
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/company-edit/${row.original._id}`)}
          >
            <Icon icon={"heroicons:pencil-square"} />
          </div>
          <div className="cursor-pointer">
            <Icon
              icon={"heroicons:trash"}
              onClick={() => openDeleteModal(row.original._id)}
            />
          </div>
        </div>
      ),
    },
  ];

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <Button link={"/company-create"}>Create company</Button>
      <DataGrid data={companies} column={COLUMNS} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this company?
            </h3>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
