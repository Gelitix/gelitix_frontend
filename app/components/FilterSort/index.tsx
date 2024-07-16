import React from "react";
import Filter from "./components/Filter";
import Sort from "./components/Sort";

const FilterSort = () => {
  const handleFilterChange = (selectedFilters: any) => {
    // Handle the filter change here
    console.log("Filters changed:", selectedFilters);
    // You might want to update some state or call a parent component's function here
  };

  return (
    <div className="px-72 md:flex justify-end mb-10 hidden md:gap-5">
      <Filter onFilterChange={handleFilterChange} />
      <Sort />
    </div>
  );
};

export default FilterSort;
