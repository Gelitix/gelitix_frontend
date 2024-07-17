"use client";

import React, { useState, useEffect } from "react";
import PersonalInformation from "./components/PersonalInformation";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const ticketTypeId = searchParams.get("ticketTypeId");

  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

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

export default Page;
