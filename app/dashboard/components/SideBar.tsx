// "use client";

// import {
//   BarChart2,
//   Boxes,
//   CalendarCheck,
//   Menu,
//   Plus,
//   ScanBarcode,
//   Ticket,
// } from "lucide-react";
// import React, { useState } from "react";
// import Image from "next/image";

// interface SidebarProps {
//   setActiveSection: (section: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <div
//         className={`fixed top-0 left-0 h-full bg-white w-64 p-4 transition-transform transform border-r border-gray-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <div className="px-5 my-5">
//           <div className="flex justify-center items-center">
//             <Image
//               src="/Gelitix-wide.png"
//               alt="Logo"
//               className="h-8"
//               height={200}
//               width={128}
//             />
//           </div>
//           <div className="flex items-center my-8">
//             <a
//               href="/dashboard/create-event"
//               className="flex items-center rounded-xl bg-[#5080c6] py-3 px-4 text-lg text-white gap-2"
//             >
//               <Plus color="white" />
//               Create Event
//             </a>
//           </div>

//           <ul className="flex flex-col space-y-10 mt-17">
//             <li className="flex items-center space-x-4">
//               <Boxes color="gray" />
//               <a
//                 href="#"
//                 onClick={() => setActiveSection("dashboard")}
//                 className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
//               >
//                 Dashboard
//               </a>
//             </li>
//             <li className="flex items-center space-x-4">
//               <CalendarCheck color="gray" />
//               <a
//                 href="#"
//                 onClick={() => setActiveSection("events")}
//                 className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
//               >
//                 Events
//               </a>
//             </li>
//             <li className="flex items-center space-x-4">
//               <Ticket color="gray" />
//               <a
//                 href="#"
//                 onClick={() => setActiveSection("orders")}
//                 className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
//               >
//                 Orders
//               </a>
//             </li>
//             <li className="flex items-center space-x-4">
//               <ScanBarcode color="gray" />
//               <a
//                 href="#"
//                 onClick={() => setActiveSection("transaction")}
//                 className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
//               >
//                 Transaction
//               </a>
//             </li>
//             <li className="flex items-center space-x-4">
//               <BarChart2 color="gray" />
//               <a
//                 href="#"
//                 onClick={() => setActiveSection("statistic")}
//                 className="hover:text-[#5080c6] text-[#b0b3b6] text-xl"
//               >
//                 Statistic
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
//         onClick={toggleSidebar}
//       >
//         <Menu />
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

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
            <Image
              src="/Gelitix-wide.png"
              alt="Logo"
              className="h-10"
              height={250}
              width={160}
            />
          </div>

          <div className="flex flex-col space-y-4 mb-8">
            <a
              href="/dashboard/create-event"
              className="flex items-center justify-center rounded-lg bg-[#5080c6] py-3 px-4 text-lg text-white gap-2 hover:bg-[#4070b6] transition-colors"
            >
              <Plus size={20} />
              Create Event
            </a>
            <a
              href="/dashboard/create-promo"
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
                { icon: Ticket, text: "Orders", section: "orders" },
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
