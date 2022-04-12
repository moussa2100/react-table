import React, { useMemo } from "react";
import { TextInput } from "@mantine/core";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSearch,
  IoIosSkipBackward,
  IoIosSkipForward,
} from "react-icons/io";

import { dt } from "./1";

const COLUMNS = [
  {
    Header: "UserID",
    accessor: "userId",
  },
  {
    Header: "Title",
    accessor: "title",
  },
];
export default function ReactTableComponent() {
  const Columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dt, []);

  const tableInstant = useTable(
    {
      columns: Columns,
      data: data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    gotoPage,
    pageCount,
    canPreviousPage,
    pageOptions,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstant;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <div className=" w-1/4 p-3">
        <TextInput
          onChange={(e) => setGlobalFilter(e.target.value)}
          value={globalFilter}
          rightSection={<IoIosSearch />}
          placeholder="Search"
        />
      </div>
      <table {...getTableProps} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className=" border-b border-slate-900 bg-gray-700 text-white"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-2 border-l border-gray-100"
                >
                  <div className=" flex items-center justify-center">
                    {column.render("Header")}
                    <span className=" ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowUp />
                        )
                      ) : (
                        " "
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-b border-gray-200 hover:bg-gray-300 even:bg-gray-100 cursor-pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="px-3 py-3 " {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center gap-2 items-center py-2">
        Go to Page |
        <select
          className="p-2 border border-gray-400 rounded-md"
          value={pageIndex}
          onChange={(e) => gotoPage(parseInt(e.target.value, 10))}
        >
          {[...Array(pageCount)].map((_, i) => (
            <option key={i} value={i}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-400 rounded-md"
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              show {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg cursor-pointer"
        >
          <IoIosSkipBackward />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg cursor-pointer"
        >
          <IoIosArrowBack />
        </button>
        <span>
          {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg"
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg"
        >
          <IoIosSkipForward />
        </button>
      </div>
    </>
  );
}
