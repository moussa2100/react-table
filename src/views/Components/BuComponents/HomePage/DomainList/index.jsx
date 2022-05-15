import React from "react";
import MentiItems from "./MenuItems";

export default function DomainList() {
  const items = [
    { title: "Nationality", router: "/nationality" },
    { title: "Country", router: "/nationality" },
    { title: "City", router: "/nationality" },
  ];

  return (
    <div className=" w-1/6 overflow-auto border border-gray-100 ">
      <ul className=" list-disc ">
        <MentiItems items={items} />
      </ul>
    </div>
  );
}
