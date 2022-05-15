import React, { useEffect, useState } from "react";

import "../../../../index.css";

import DomainList from "./DomainList";

import PrefRoutes from "../../../Routes/PrefRoutes";

export default function HomePage() {
  const stylee = [
    "w-5/6",
    "px-4",
    "overflow-auto",
    "border",
    "border-gray-100",
    "px-3",
    "flex",
    "flex-col",
    "gap-3",
  ];

  return (
    <div className="flex-col flex items-stretch ">
      <div className="h-[50px] bg-[#323232] flex items-center p-3 ">
        <p className=" text-white text-xl "> Prefernces </p>
      </div>

      <div className="  p-4 bg-gray-100  ">
        <div className="pt-5 border border-gray-200 bg-gray-50  flex rounded-lg   h-[900px]">
          <DomainList />

          <div className={stylee.join(" ")}>
            <PrefRoutes />
          </div>
        </div>
      </div>
    </div>
  );
}
