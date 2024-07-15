import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FilterIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import seminar from "@/public/landingpage/icons/icons8-training-100 (1).png";
import exhibition from "@/public/landingpage/icons/icons8-exhibition-100 (1).png";
import horror from "@/public/landingpage/icons/icons8-horror-100 (1).png";
import concert from "@/public/landingpage/icons/icons8-concert-100 (1).png";
import sports from "@/public/landingpage/icons/icons8-sport-96.png";
import comedy from "@/public/landingpage/icons/icons8-comedy-100 (1).png";

type FilterOption = {
  name: string;
  icon: StaticImageData;
};

// Define the props for our Filter component
interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const toggleFilter = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? "" : filter));
  };

  const applyFilters = () => {
    onFilterChange(selectedFilter);
  };

  const filterOptions = [
    { name: "Seminar", icon: seminar },
    { name: "Exhibition", icon: exhibition },
    { name: "Horror", icon: horror },
    { name: "Concert", icon: concert },
    { name: "Sports", icon: sports },
    { name: "Comedy", icon: comedy },
  ];

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex gap-[8px] items-center border-[1px] border-gray-300 rounded-full py-2 px-4">
            <FilterIcon className="size-4  fill-gray-300 text-gray-300" />
            <p className="text-[16px]">Filter</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <p className="text-[20px]">Filter</p>
              <AlertDialogCancel className="border-0 ">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                >
                  <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                </svg>
              </AlertDialogCancel>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription>
            <div className="flex gap-2 flex-wrap">
              {filterOptions.map((option) => (
                <div
                  key={option.name}
                  className="flex flex-col gap-4 items-center justify-center"
                  onClick={() => toggleFilter(option.name)}
                >
                  <div
                    className={`p-3 bg-white border-2 ${
                      selectedFilter === option.name
                        ? "border-[#0064D2]"
                        : "border-gray-300"
                    } rounded-full hover:opacity-50 transition-all duration-200 cursor-pointer`}
                  >
                    <Image
                      src={option.icon}
                      alt={`${option.name}.png`}
                      className="size-12"
                    />
                  </div>
                  <p>{option.name}</p>
                </div>
              ))}
            </div>
          </AlertDialogDescription>
          <AlertDialogAction onClick={applyFilters}>
            Apply Filters
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Filter;
