import React from "react";
import { Link } from "react-router-dom";

export default function MentiItems({ items }) {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index} className=" ">
            {/* <a href="#" className="text-gray-600 text-sm font-bold  p-3 bg-gray-200 hover:bg-gray-400 hover:text-white flex border-[1px] border-gray-300  "> { item.title}</a>  */}
            <Link
              to={item.router}
              className="text-gray-600 text-sm   p-3 bg-gray-200 hover:bg-gray-400 hover:text-white flex border-[1px] border-gray-300  "
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
