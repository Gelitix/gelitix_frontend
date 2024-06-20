import React from "react";
import Filter from "./components/Filter";
import Sort from "./components/Sort";

const FilterSort = () => {
  return (
    <div className="px-72 md:flex justify-end mb-10 hidden md:gap-5">
      <Filter />
      <Sort />
    </div>
  );
};

export default FilterSort;
