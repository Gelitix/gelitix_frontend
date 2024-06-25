"use client";

import {
  BarChart2,
  Boxes,
  CalendarCheck,
  Menu,
  Plus,
  ScanBarcode,
  Ticket,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 p-4 transition-transform transform border-r border-gray-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-5 my-5">
          <div className="flex justify-center items-center">
            <Image
              src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/test-discovery/2024/03/01/ac13e03e-896c-4bbb-ba7c-cdf9b04a68b7-1709290197088-cb26aa8c25b24b1aa5df8bb2edce7ea7.png"
              alt="Logo"
              className="h-8"
              height={64}
              width={128}
            />
          </div>
          <div className="flex items-center my-8">
            <a
              href="/dashboard/create_event"
              className="flex items-center rounded-xl bg-[#5080c6] py-3 px-4 text-lg text-white gap-2"
            >
              <Plus color="white" />
              Create Event
            </a>
          </div>

          <ul className="flex flex-col space-y-10 mt-17">
            <li className="flex items-center space-x-4">
              <Boxes color="gray" />
              <a
                href="#"
                className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
              >
                Dashboard
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <CalendarCheck color="gray" />
              <a
                href="#"
                className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
              >
                Events
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <Ticket color="gray" />
              <a
                href="#"
                className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
              >
                Orders
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <ScanBarcode color="gray" />
              <a
                href="#"
                className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
              >
                Transaction
              </a>
            </li>
            <li className="flex items-center space-x-4">
              <BarChart2 color="gray" />
              <a
                href="#"
                className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
              >
                Statistic
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
    </div>
  );
};

export default Sidebar;
