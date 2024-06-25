// components/PackageCard.js

import React from "react";

import Standing from "@/components/Icons/Standing";

const PackageCard = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-min w-1/2">
        <div className="flex justify-start p-5">
          <h3 className="font-bold">Packages</h3>
        </div>
        <div className=" bg-gray-100 p-7 rounded-xl border-none">
          <div className="flex flex-col text-left bg-white rounded-xl p-5">
            <h4>Festival</h4>
            <div className="flex flex-row items-start justify-start gap-4 pt-5">
              <Standing />
              <p className="">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className="text-blue-600 font-bold py-5">DETAILS</p>
            <p className="border-t border-dashed border-gray-300"></p>
            <div className="flex flex-row justify-between items-center p-5">
              <p className="text-red-500 text-left px-6 py-3 ">PRICE</p>
              <button className=" border-none border-blue-700 bg-blue-500 text-white px-6 py-3 rounded-xl">
                Select Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
