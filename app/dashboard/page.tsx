"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/app/dashboard/components/SideBar";
import SearchBar from "@/components/SearchBar";
import EventFilter from "@/app/dashboard/components/EventFilter";
import Statistics from "./components/Statistics";
import StatisticsCards from "../product/components/StatCard";
import PriceStat from "../product/components/ProfitCard";
import Collections from "../product/components/Collections";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyEvent from "./components/MyEvent";
import DashNav from "./components/DashNav";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Check if the user has the required role
      const userRoles = session?.user?.roles;
      const hasEventOrganizerRole = Array.isArray(userRoles)
        ? userRoles.includes("ROLE_EVENT_ORGANIZER")
        : userRoles === "ROLE_EVENT_ORGANIZER";

      if (!hasEventOrganizerRole) {
        router.push("/unauthorized");
      } else {
        setIsLoading(false);
      }
    }
  }, [status, session, router]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // This shouldn't render, but just in case
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
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
        );
      case "events":
        return (
          <div>
            <MyEvent />
          </div>
        ); // Placeholder for events content
      case "orders":
        return <div>Orders Section</div>; // Placeholder for orders content
      case "transaction":
        return <div>Transaction Section</div>; // Placeholder for transaction content
      case "statistic":
        return <div>Statistic Section</div>; // Placeholder for statistic content
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 h-full ml-0 lg:ml-64">
        <DashNav />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
