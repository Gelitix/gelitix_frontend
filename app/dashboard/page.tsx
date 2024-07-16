"use client";

import React, { useState } from "react";
import Sidebar from "@/app/dashboard/components/SideBar";
import EventFilter from "@/app/dashboard/components/EventFilter";
import Statistics from "./components/Statistics";
import StatisticsCards from "../product/components/StatCard";
import PriceStat from "../product/components/ProfitCard";
import Collections from "../product/components/Collections";
import MyEvent from "./components/MyEvent";
import DashNav from "./components/DashNav";
import RoleBasedAccess from "../components/RoleBasedAccess";
// Make sure this import path is correct

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="bg-[#fafafa]">
            <div className="p-5">
              <EventFilter />
            </div>
            <div className="flex flex-col text-left items-start ml-10">
              <h2 className="py-5 text-xl">Stats</h2>
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
              <h2 className="py-5 text-xl">Revenue</h2>
              <PriceStat />
            </div>
            <div className="flex flex-col text-left items-start mt-10 ml-10">
              <h2 className="py-7 text-xl">My Events</h2>
              <Collections />
            </div>
          </div>
        );
      case "events":
        return <MyEvent />;
      case "orders":
        return <div>Orders Section</div>;
      case "transaction":
        return <div>Transaction Section</div>;
      case "statistic":
        return <div>Statistic Section</div>;
      default:
        return null;
    }
  };

  return (
    <RoleBasedAccess allowedRoles={["ROLE_EVENT_ORGANIZER"]}>
      <div className="flex">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 h-full ml-0 lg:ml-64">
          <DashNav />
          {renderContent()}
        </div>
      </div>
    </RoleBasedAccess>
  );
};

export default Home;
