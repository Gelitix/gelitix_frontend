import React, { useState, useEffect, useRef } from "react";
import seminar from "@/public/landingpage/icons/icons8-training-100 (1).png";
import exhibition from "@/public/landingpage/icons/icons8-exhibition-100 (1).png";
import horror from "@/public/landingpage/icons/icons8-horror-100 (1).png";
import concert from "@/public/landingpage/icons/icons8-concert-100 (1).png";
import sports from "@/public/landingpage/icons/icons8-sport-96.png";
import comedy from "@/public/landingpage/icons/icons8-comedy-100 (1).png";
import Image from "next/image";
import promo from "@/public/landingpage/promo.webp";
import NavBar from "@/components/NavBar";
import useDebounce from "@/app/hooks/useDebounce"; // Adjust the import path as needed
import Search from "@/app/components/searchBar";

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchEventNames(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const searchEventNames = async (name: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/event-name/${name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch event names");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Error searching events:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  console.log(searchTerm);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSearchTerm(searchResults[selectedIndex]);
      setSearchResults([]);
    }
  };

  const handleSelectResult = (result: string) => {
    setSearchTerm(result);
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  return (
    <section className="mb-8">
      <div className="md:h-[576px] h-[175px] bg-cover bg-[url('/landingpage/hero.webp')] md:px-[230px] ">
        <NavBar />
        <div className="items-center text-center pt-[10px] md:pt-[80px] ">
          <h1 className="text-white text-[20px] md:text-[35px]">
            Hey there, <span className="font-semibold">going somewhere?</span>
          </h1>
          <div className="">
            {/* <input
              ref={searchInputRef}
              type="text"
              className="relative rounded-full pl-10 md:pl-[44px] pr-4 py-2 w-[260px] md:w-[615px] h-[40px] md:h-[60px]  focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] md:text-lg mt-[5px] md:mt-[20px]"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            /> */}
            <Search />
            <button className="absolute left-[60px] md:left-[545px] top-[109px] md:top-[233px] ml-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1.6em"
                width="1.6em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </button>

            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-2 w-[260px] md:w-[615px] bg-white rounded-md shadow-lg">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer ${
                      index === selectedIndex
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectResult(result)}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}

            {isSearching && (
              <div className="absolute z-10 mt-2 w-[260px] md:w-[615px] bg-white rounded-md shadow-lg px-4 py-2">
                Searching...
              </div>
            )}

            <div className=" hidden md:block">
              <div className="flex gap-4 justify-center mt-10">
                <div>
                  <div className="border-8 rounded-full border-white/25  hover:bg-white/100">
                    <Image
                      src={seminar}
                      alt="seminar.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white font-[600] text-[14px]">Seminar</p>
                </div>

                <div>
                  <div className="border-8 rounded-full border-white/25  hover:bg-white/100">
                    <Image
                      src={concert}
                      alt="concerts.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white font-[600] text-[14px]">Concerts</p>
                </div>

                <div>
                  <div className="border-8 rounded-full border-white/25  hover:bg-white/100">
                    <Image
                      src={horror}
                      alt="horror.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white font-[600] text-[14px]">Horror</p>
                </div>

                <div>
                  <div className="border-8 rounded-full border-white/25  hover:bg-white/100">
                    <Image
                      src={comedy}
                      alt="comedy.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white text-[14px] font-[600]">Comedy</p>
                </div>

                <div>
                  <div className="border-8 rounded-full border-white/25  hover:bg-white/100">
                    <Image
                      src={sports}
                      alt="sports.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white font-[600] text-[14px]">Sports</p>
                </div>

                <div>
                  <div className="border-8 rounded-full border-white/25 w-[72px]  hover:bg-white/100">
                    <Image
                      src={exhibition}
                      alt="exhibition.svg"
                      className="  bg-white rounded-full  p-3 w-14 h-fit"
                    />
                  </div>

                  <p className="text-white font-[600] text-[14px]">
                    Exhibition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-6 gap-2 place-items-center mt-5 md:hidden mx-[20px]">
          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={seminar}
                alt="seminar.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Seminar</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={concert}
                alt="concert.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Concerts</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={horror}
                alt="horror.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Horror</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={comedy}
                alt="comedy.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Comedy</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={exhibition}
                alt="exhibition.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Exhibition</p>
          </div>

          <div className=" flex flex-col items-center">
            <div className="border-[3px] rounded-full w-12 h-12 border-[#0064d2]/80  hover:bg-white/100 flex justify-center items-center">
              <Image
                src={sports}
                alt="sport.svg"
                className="  bg-white rounded-full  p-[6px] md:p-3 w-[60px] md:w-14 h-fit"
              />
            </div>

            <p className="text-black font-[400] text-[10px]">Sports</p>
          </div>
        </div>
        <p className="bg-[#e7f2ff] text-center text-[12px] font-[200] tracking-normal py-[10px] mt-[20px] md:mt-0">
          tiket.com - One App For Your Holiday Needs
        </p>

        <div className="p-6 md:px-72 md:grid grid-cols-2 gap-5 items-center ">
          <div>
            <p className="font-semibold mb-3 text-lg md:text-[28px] md:mb-4">
              Welcome gift for new users! 🥳🎁
            </p>
            <p className="text-lg text-gray-500 hidden md:block">
              New here? We&#39;re thrilled to have you! Register today and
              receive an exclusive 20% discount on your first order.
            </p>
          </div>

          <Image src={promo} alt="promo.webp" className="md:w-full" />
        </div>
      </div>
    </section>
  );
};
