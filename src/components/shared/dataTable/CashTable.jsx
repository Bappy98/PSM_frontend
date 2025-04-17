import GlobalFilter from "@/components/shared/dataTable/GlobalFilter";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function CashTable({ data, column }) {
  const dataMemo = useMemo(() => data || [], [data]);
  const columnMemo = useMemo(() => column, []);

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
  } = useTable(
    {
      columns: columnMemo,
      data: dataMemo,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFiler, pageIndex, pageSize } = state;

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                   
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
      
    </>
  );
}

export default CashTable;
