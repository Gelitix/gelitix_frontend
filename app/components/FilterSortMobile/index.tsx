import React, { useState } from "react";
import Filter from "./components/Filter";
import { Sort } from "./components/Sort";

const FilterSortMobile = () => {
  const [visibleContent, setVisibleContent] = useState<string | null>(null);

  const showContent = (content: string) => {
    setVisibleContent(content);
  };

  const closeContent = () => {
    setVisibleContent(null);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white text-black z-50  md:hidden"
      style={{ boxShadow: "0 0 20px 0 rgba(48, 49, 53, .16)" }}
    >
      <div className="px-4 w-full">
        {visibleContent === "Filter" && <Filter onClose={closeContent} />}
        {visibleContent === "Sort" && <Sort onClose={closeContent} />}
      </div>

      <div className="">
        <div className="flex justify-around">
          <button className="p-2 rounded" onClick={() => showContent("Filter")}>
            <div className="flex flex-col items-center justify-center gap-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1.4em"
                width="1.4em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"></path>
              </svg>

              <p className="text-[12px]">Filter</p>
            </div>
          </button>
          <button className="p-2 rounded" onClick={() => showContent("Sort")}>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1.4em"
                width="1.4em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 16L4 16 10 22 10 19 10 16 10 2 8 2zM14 5L14 8 14 22 16 22 16 8 20 8 14 2z"></path>
              </svg>
              <p className="text-[12px]">Sort</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSortMobile;
