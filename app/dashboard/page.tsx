"use client";

import React, { useState } from "react";
import Sidebar from "@/app/dashboard/components/SideBar";
import EventFilter from "@/app/dashboard/components/EventFilter";
import MyEvent from "./components/MyEvent";
import DashNav from "./components/DashNav";
import RoleBasedAccess from "../components/RoleBasedAccess";
import Statistics from "./components/Statistics";
// Make sure this import path is correct

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="bg-[#fafafa] h-100vh">
            <div className="p-10">
              <EventFilter />
            </div>

            <div className="flex items-center justify-center">
              <Statistics />
            </div>
          </div>
        );
      case "events":
        return <MyEvent />;
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
