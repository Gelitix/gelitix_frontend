// components/SearchBar.tsx
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", query);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-xl py-1 px-10">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="flex-grow p-2 outline-none"
      />
      <div>
        <Search
          onClick={handleSearch}
          className=" text-white p-1 rounded-xl ml-2"
          color="gray"
        />
      </div>
    </div>
  );
};

export default SearchBar;
