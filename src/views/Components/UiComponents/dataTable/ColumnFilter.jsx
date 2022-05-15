import React from "react";
import { MdOutlineClear } from "react-icons/md";

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;

  return (
    <div className="flex gap-1">
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${column.id}...`}
        className=" py-2 px-3  border border-gray-200 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      />

      <div className="flex items-center ">
        {filterValue && (
          <MdOutlineClear
            onClick={() => setFilter(undefined)}
            className="text-red-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
