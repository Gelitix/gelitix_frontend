"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useEffect, useState } from "react";

import React from "react";

const Search = ({ placeholder = "Search Event" }: { placeholder?: string }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 625);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchParams, router]);

  return (
    <div>
      <input
        type="text"
        className="relative rounded-full pl-10 md:pl-[44px] pr-4 py-2 w-[260px] md:w-[615px] h-[40px] md:h-[60px]  focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] md:text-lg mt-[5px] md:mt-[20px]"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
