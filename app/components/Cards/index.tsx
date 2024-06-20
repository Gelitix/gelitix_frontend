import LandingPageDummyData from "@/DUMMY_DATA/LandingPage/LandingPageDummyData";
import React from "react";
import Card from "./Card";

const Cards = () => {
  return (
    <section className="md:grid grid-cols-4 flex flex-col gap-10 md:gap-5 md:px-72">
      {LandingPageDummyData.map((e, index) => (
        <Card {...e} key={index} />
      ))}
    </section>
  );
};

export default Cards;
