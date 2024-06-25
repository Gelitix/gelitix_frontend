// components/EventFilter.tsx

import { Calendar } from "lucide-react";
import { FC } from "react";

const EventFilter: FC = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-start space-x-2">
        <button className="flex items-center space-x-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-blue-600">
          <span>All events</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-end space-x-2 justify-end">
        <div className="flex items-end space-x-2">
          {["24H", "1M", "1Y"].map((label, index) => (
            <button
              key={index}
              className={`rounded-full px-4 py-2 ${
                label === "1Y"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="flex items-end space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2">
          <Calendar />
          <span>Choose date</span>
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
