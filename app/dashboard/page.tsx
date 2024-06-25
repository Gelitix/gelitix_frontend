"use client";

import React, { useState } from "react";

import Sidebar from "@/app/dashboard/components/SideBar";
import SearchBar from "@/components/SearchBar";
import EventFilter from "@/app/dashboard/components/EventFilter";

import Statistics from "./components/Statistics";
import StatisticsCards from "../product/components/StatCard";
import PriceStat from "../product/components/ProfitCard";
import Collections from "../product/components/Collections";

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-full ml-0 lg:ml-64">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl mt-5 ml-20">Dashboard</h1>
          <div className="mt-5">
            <SearchBar />
          </div>
          <div className="relative mt-5 mr-20">
            <div
              className="h-12 w-12 bg-gray-500 text-white flex items-center justify-center rounded-full cursor-pointer ml-4"
              onClick={toggleDropdown}
            >
              HH
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#fafafa]">
          <div className="p-5">
            <EventFilter />
          </div>
          <div className="flex flex-col text-left items-start ml-10">
            <h2 className=" py-5 text-xl">Stats</h2>
          </div>
          <div className="flex items-center justify-center">
            <StatisticsCards />
          </div>

          <div className="flex justify-center items-center mt-10">
            <div className="bg-white p-6 rounded-lg shadow w-full sm:w-1/2">
              <Statistics />
            </div>
          </div>

          <div className="flex flex-col text-left items-start mt-10 ml-10">
            <h2 className=" py-5 text-xl">Revenue</h2>
            <PriceStat />
          </div>
          <div className="flex flex-col text-left items-start mt-10 ml-10">
            <h2 className=" py-7 text-xl">My Events</h2>
            <Collections />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
