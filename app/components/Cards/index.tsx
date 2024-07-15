import LandingPageDummyData from "@/DUMMY_DATA/LandingPage/LandingPageDummyData";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Filter from "../FilterSort/components/Filter";
// import Pagin from "../Pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Event = any;

const Cards = () => {
  const [events, setEvents] = useState<any[]>([]); // Or use a more specific type if available
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("");

  // const page = searchParams.get("page") || "0";
  const searchParams = useSearchParams();
  const size = searchParams.get("size") || "12";
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "asc";
  const eventCategory = searchParams.get("eventCategory") || "";
  const search = searchParams.get("search") || ""; // Ensure search is a string

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // const parsedCurrentPage = parseInt(currentPage.toString(), 10);

      const queryString = new URLSearchParams({
        page: currentPage.toString(),
        size,
        sort,
        order,
        search,
        ...(activeFilter && { eventCategory: activeFilter }),
      }).toString();

      try {
        console.log(`http://localhost:8080/api/v1/events?${queryString}`);
        const response = await fetch(
          `http://localhost:8080/api/v1/events?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        console.log(data);
        setEvents(data.data);
        setPageNumber(data.pageNumber);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, size, sort, order, eventCategory, activeFilter, search]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const pageNumbers = Array.from({ length: pageNumber }, (_, i) => i + 1);

  return (
    <section>
      <Filter onFilterChange={handleFilterChange} />

      <section className="md:grid grid-cols-4 flex flex-col gap-10 md:gap-5 md:px-72">
        {events != null ? (
          events.map((e, index) => <Card {...e} key={index} />)
        ) : (
          <div>No events available</div>
        )}
      </section>
      <div className="mt-16 md:mt-20 mb-10 md:mb-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                className={
                  currentPage === 0 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  onClick={() => setCurrentPage(number - 1)}
                  isActive={currentPage === number - 1}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(pageNumber - 1, currentPage + 1))
                }
                className={
                  currentPage === pageNumber - 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Cards;
