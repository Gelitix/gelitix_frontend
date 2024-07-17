"use client";

import {
  BarChart2,
  Boxes,
  CalendarCheck,
  Menu,
  Plus,
  ScanBarcode,
  Ticket,
  Tag,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-full bg-white w-72 p-6 transition-transform transform border-r border-gray-200 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center mb-8">
            <Link href="/">
              <Image
                src="/Gelitix-wide.png"
                alt="Logo"
                className="h-10"
                height={250}
                width={160}
              />
            </Link>
          </div>

          <div className="flex flex-col space-y-4 mb-8">
            <a
              href="/events/create-event"
              className="flex items-center justify-center rounded-lg bg-[#5080c6] py-3 px-4 text-lg text-white gap-2 hover:bg-[#4070b6] transition-colors"
            >
              <Plus size={20} />
              Create Event
            </a>
            <a
              href="/events/create-promo"
              className="flex items-center justify-center rounded-lg bg-[#50c680] py-3 px-4 text-lg text-white gap-2 hover:bg-[#40b670] transition-colors"
            >
              <Tag size={20} />
              Create Promo
            </a>
          </div>

          <nav className="flex-grow">
            <ul className="space-y-6">
              {[
                { icon: Boxes, text: "Dashboard", section: "dashboard" },
                { icon: CalendarCheck, text: "Events", section: "events" },

                {
                  icon: ScanBarcode,
                  text: "Transaction",
                  section: "transaction",
                },
                { icon: BarChart2, text: "Statistic", section: "statistic" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setActiveSection(item.section)}
                    className="flex items-center space-x-4 text-gray-600 hover:text-[#5080c6] transition-colors"
                  >
                    <item.icon size={24} />
                    <span className="text-lg">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
