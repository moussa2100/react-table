import React, { useMemo } from "react";
import { Button, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiEditBoxLine, RiEyeLine } from "react-icons/ri";
import { Tooltip } from "@mantine/core";
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

import { employees } from "./1";

const statusCycle = (status) => {
  switch (status) {
    case "Training":
      return ["bg-blue-800"];
    case "Inactive":
      return ["bg-red-700"];
    case "Pending":
      return ["bg-yellow-600"];
    default:
      return ["bg-green-400"];
  }
};

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    maxWidth: 10,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => {
      return (
        <div className="flex items-center ">
          <img
            src={row.values.profileImage}
            alt=""
            className="h-8 w-8 object-cover rounded-full"
          />
          <div className=" flex-col flex">
            <span className="ml-2">{row.values.name}</span>
            <span className=" text-xs ml-2  text-gray-500 ">
              {row.values.position}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Status",

    Cell: ({ row }) => (
      <div
        className={`px-2 py-1 text-sm rounded-md  text-white flex justify-center w-16 ${[
          ...statusCycle(row.values.employment),
        ]}`}
      >
        <p> {row.values.employment} </p>
      </div>
    ),
    maxWidth: 5,
  },
  {
    id: "employment",
    Header: "Employment",
    accessor: "employment",
    maxWidth: 20,
    Cell: ({ row }) => {
      return (
        <div className="flex items-center  ">
          <div
            className={`w-4 h-4  rounded-full mr-2 +  ${[
              ...statusCycle(row.values.employment),
            ]}`}
          ></div>
          <span className=" ">{row.values.employment}</span>
        </div>
      );
    },
  },
  {
    Header: "Salary",
    accessor: "salary",
    maxWidth: 10,
    minWidth: 10,
  },
  {
    Header: "Age",
    accessor: "age",
    maxWidth: 10,
    minWidth: 10,
  },
  {
    id: "profileImage",
    Header: "Profile Image",
    accessor: "profileImage",
    Cell: ({ value }) => (
      <img src={value} alt="" className="h-10 w-10 object-cover rounded-full" />
    ),
  },
  {
    id: "position",
    Header: "Position",
    accessor: "position",
  },
  {
    id: "actions",
    Header: "Actions",
    maxWidth: 30,
    Cell: ({ row }) => (
      <div className="flex items-center ">
        <Tooltip label="Delete" withArrow>
          <button
            className="py-1 px-2 text-xl rounded-md text-red-600"
            title="Delete "
          >
            <RiDeleteBin6Line />
          </button>
        </Tooltip>
        <Tooltip label="Edit" withArrow>
          <button
            className="py-1 px-2  text-xl rounded-md  text-teal-700"
            title="Edit "
            onClick={() => alert(row.values.name)}
          >
            <RiEditBoxLine />
          </button>
        </Tooltip>
        <Tooltip label="View" withArrow>
          <button
            className="py-1 px-2  text-xl rounded-md text-sky-600"
            title="View"
          >
            <RiEyeLine />
          </button>
        </Tooltip>
      </div>
    ),
  },
];
export default function ReactTableComponent() {
  const Columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => employees);

  const tableInstant = useTable(
    {
      columns: Columns,
      data: data,
      initialState: {
        hiddenColumns: ["position", "profileImage"],
      },
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
              className="  bg-gray-200 text-gray-500 text-sm"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-3 border-l border-gray-100"
                >
                  <div className=" flex items-center ">
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
                className="border-b border-gray-200 hover:border-[1px] hover:border-gray-400 hover:bg-gray-100 "
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

      {/* Paging information */}
      <div className="flex justify-center gap-2 items-center py-2">
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
        <div className="w-5"></div>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className=" font-bold p-3 hover:bg-gray-100 rounded-full cursor-pointer border-[1px] border-slate-500"
        >
          <IoIosSkipBackward />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className=" font-bold p-3 hover:bg-gray-100 rounded-full cursor-pointer border-[1px] border-slate-500"
        >
          <IoIosArrowBack />
        </button>
        <span>
          {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className=" font-bold p-3 hover:bg-gray-100 rounded-full cursor-pointer border-[1px] border-slate-500"
        >
          <IoIosArrowForward />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className=" font-bold p-3 hover:bg-gray-100 rounded-full cursor-pointer border-[1px] border-slate-500"
        >
          <IoIosSkipForward />
        </button>
        <div className="w-5"></div>
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
      </div>
    </>
  );
}
