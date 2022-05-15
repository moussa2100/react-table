import React, { useMemo, useState } from "react";
import { TextInput, Checkbox } from "@mantine/core";
import { RiDeleteBin6Line, RiEditBoxLine, RiEyeLine } from "react-icons/ri";
import { Tooltip } from "@mantine/core";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
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
import ColumnFilter from "./ColumnFilter";
import Highlight from "./highlight";
import "./style.css";
import { TextField } from "@mui/material";

//Delete me on production
const selectedRow = () => {
  if (selectedFlatRows.length > 0) {
    return selectedFlatRows.map((d) => d.original);
  } else {
    return null;
  }
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <div>
          <Checkbox
            ref={resolvedRef}
            {...rest}
            className=" checked:bg-blue-500 "
          />
        </div>
      </>
    );
  }
);

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
    id: "selection",
    disableGlobalFilter: true,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      </div>
    ),

    Cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      </div>
    ),
  },
  {
    Header: "ID",
    disableGlobalFilter: true,
    accessor: "id",
    maxWidth: 10,

    Cell: ({ row }) => (
      <a className="text-blue" href="google.com">
        {row.values.id}
      </a>
    ),
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center ">
          <img
            src={row.row.values.profileImage}
            alt=""
            className="h-8 w-8 object-cover rounded-full"
          />
          <div className=" flex-col flex">
            <span className="ml-2">
              <Highlight
                searchWords={[row.state.globalFilter]}
                textToHighlight={row.row.values.name}
              />
            </span>
            <span className=" text-xs ml-2  text-gray-500 ">
              {row.row.values.position}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Status",
    Cell: ({ row, state }) => (
      <div
        className={`px-2 py-1 text-sm rounded-md  text-white flex justify-center w-16 ${[
          ...statusCycle(row.values.employment),
        ]}`}
      >
        <span>
          <Highlight
            searchWords={[state.globalFilter]} 

            textToHighlight={row.values.employment}
          />
        </span>
      </div>
    ),

    maxWidth: 20,
  },
  {
    id: "employment",
    Header: "Employment",
    accessor: "employment",
    maxWidth: 20,
    Cell: ({ row, state }) => {
      return (
        <div className="flex items-center  ">
          <div
            className={`w-4 h-4  rounded-full mr-2 +  ${[
              ...statusCycle(row.values.employment),
            ]}`}
          ></div>
          <span className=" ">
            <Highlight
              searchWords={[state.globalFilter]}
              textToHighlight={row.values.employment}
            />
          </span>
        </div>
      );
    },
  },
  {
    Header: "Salary",
    accessor: "salary",
    maxWidth: 10,
    minWidth: 10,

    Cell: ({ row, state }) => (
      <span>
        <Highlight
          searchWords={[state.globalFilter]}
          textToHighlight={row.values.salary}
        />
      </span>
    ),
  },
  {
    Header: "Age",
    accessor: "age",
    maxWidth: 10,
    minWidth: 10,

    Cell: ({ row, state }) => (
      <span>
        <Highlight
          searchWords={[state.globalFilter]}
          textToHighlight={row.values.age}
        />
      </span>
    ),
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
    disableGlobalFilter: true,
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
      defaultcanFilter: true,
      initialState: {
        hiddenColumns: ["position", "profileImage"],
      },
    },
    // useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
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
    selectedFlatRows,
    setGlobalFilter,
  } = tableInstant;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="w-[100%]">
      <div className="p-5 w-[30%]">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          fullWidth
          size="small"
        />
      </div>
      {/* <div className=" w-1/2 p-5 relative  ">
        <input
          className="lbl pl-2 py-2 w-1/2 border rounded-md border-1 border-blue-300 focus:border-blue-300 focus:border-2 bg-gray-50 "
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          value={globalFilter}
          icon={<IoIosSearch />}
        />
        <label className=" bg-gray-50 absolute top-[30px] left-[30px] text-gray-600 px-2 transition-all duration-200 ">
          Search
        </label>
      </div> */}
      <div className="p-5">
        <table {...getTableProps} className="w-full border border-gray-200">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="  bg-[#e7e7e7] text-gray-500 text-sm  "
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-3 py-4 "
                  >
                    <div className=" ">
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
                    </div>
                    {/* <div className="py-2 ">
                      {column.canFilter ? column.render("Filter") : ""}
                    </div> */}
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
                  className="border-t border-gray-200  hover:bg-gray-100 "
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
      </div>

      {/* Paging information */}
      <div className="flex justify-center gap-2 items-center py-2">
        <select
          className=" border border-gray-400 rounded-md"
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
          className=" border border-gray-400 rounded-md"
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

      {/* Selected rows */}
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowss: selectedFlatRows.map((d) => d.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
}
