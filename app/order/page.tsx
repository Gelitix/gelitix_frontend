"use client";

import React from "react";
import PersonalInformation from "./components/PersonalInformation";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const ticketTypeId = searchParams.get("ticketTypeId");
  return (
    <div className="">
      <div className=" bg-[#F4F7FE]">
        <NavBar />
        <OrderForm eventId={eventId} ticketTypeId={ticketTypeId} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
