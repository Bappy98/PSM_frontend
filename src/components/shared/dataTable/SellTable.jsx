import GlobalFilter from "@/components/shared/dataTable/GlobalFilter";
import {Checkbox} from "@/components/shared/dataTable/Checkbox";
import React, { useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useRowSelect
} from "react-table";
import { useDispatch } from "react-redux";
import { addMedicine } from "@/store/api/requastMedicne/requestSlice";
import AddMedicineReq from "@/components/addMedicineReq";
import ProductSell from "@/components/sells";

function SellTable({ data, column,open,setOpen }) {
    const dataMemo = useMemo(() => data || [], [data]);
  const columnMemo = useMemo(() => column, []);

  const dispatch = useDispatch()
  
  console.log("data",data);
  
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    selectedFlatRows
  } = useTable(
    {
      columns: columnMemo,
      data: dataMemo,
      initialState: { pageSize: 20 } // Initial page size
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ]);
    }
  );

  const firstPageRows = rows.slice(0, 10);

 // console.log(selectedFlatRows);
  useEffect(()=>{
    const selectedMedicines = selectedFlatRows.map((row) => ({
      medicine: row.original.medicine,
      quantity: row.original.quantity
    }));
    dispatch(addMedicine(selectedMedicines))
  },[dispatch,selectedFlatRows])
  

  const { globalFiler, pageIndex, pageSize } = state;
  return (
    <div className="relative">
     <div className="btnDiv justify-end">
      <button className="relative flex items-center justify-center p-3 bg-blue-500 text-white rounded" onClick={()=>setOpen(true)}>Sell</button>
      </div>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      
      <GlobalFilter filter={globalFiler} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        className="w-full text-sm text-left rtl:text-right text-gray-700"
      >
        <thead>
          {...headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-300"
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-sm py-2 px-6"
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                {...row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="text-sm py-2 px-6"
                    scope="col"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between mx-16">
      <div className="my-2">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[20,30,50,60,100].map((pageSize) => (
            <option key={pageSize} defaultValue={20} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          className="btn"
          disabled={!canPreviousPage}
          onClick={() => gotoPage(0)}
        >
          {"<<"}
        </button>
        <button
          className="btn"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        >
          Previous
        </button>
        <button
          className="btn"
          disabled={!canNextPage}
          onClick={() => nextPage()}
        >
          Next
        </button>
        <button
          className="btn"
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
        >
          {">>"}
        </button>
      </div>
    </div>
    {
      open && <ProductSell data={selectedFlatRows} setOpen={setOpen}/>
    }
  </div>
  )
}

export default SellTable