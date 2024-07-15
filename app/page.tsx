"use client";
import React from "react";
import Footer from "@/components/footer/Footer";
import { Hero } from "./components/Hero";
import Cards from "./components/Cards";
import FilterSortMobile from "./components/FilterSortMobile";
import CarouselLanding from "./components/CarouselLanding";
// import Pagination from "./components/Pagination";
import FilterSort from "./components/FilterSort";

const page = () => {
  return (
    <section>
      <Hero />
      <CarouselLanding />
      <FilterSort />
      <Cards />
      <Footer />
      <FilterSortMobile />
    </section>
  );
};

export default page;
