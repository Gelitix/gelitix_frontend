"use client";

// import React, { useState, useEffect } from "react";
// import PersonalInformation from "./components/PersonalInformation";
// import TotalPrice from "./components/TotalPrice";
// import OrderForm from "./components/OrderForm";
// import Footer from "@/components/footer/Footer";
// import NavBar from "@/components/NavBar";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// const Page = () => {
//   const searchParams = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   const ticketTypeId = searchParams.get("ticketTypeId");

//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <div className="">
//       <div className=" bg-[#F4F7FE]">
//         <NavBar />
//         <OrderForm eventId={eventId} ticketTypeId={ticketTypeId} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;

import React, { useState, useEffect } from "react";

// Example data
const data = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grape",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Strawberry",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 0) {
      const filteredSuggestions = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Type to search..."
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute border bg-white w-full mt-1 max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
