import React from "react";
import SectionBar from "./components/SectionBar";
import NavBar from "@/components/NavBar";
import EventMain from "./components/EventMain";
import EventDetail from "./components/EventDetail";

const page = () => {
  return (
    <main>
      <NavBar />
      <EventMain />
      <SectionBar />
      <EventDetail />
    </main>
  );
};

export default page;
