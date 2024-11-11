"use client";

import React, { Suspense } from "react";
import PersonalInformation from "./components/PersonalInformation";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RoleBasedAccess from "../components/RoleBasedAccess";

const OrderContent = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const ticketTypeId = searchParams.get("ticketTypeId");

  return (
    <div className=" bg-[#F4F7FE]">
      <NavBar />
      <OrderForm eventId={eventId} ticketTypeId={ticketTypeId} />
    </div>
  );
};

const Page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_USER"]}>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderContent />
        </Suspense>
        <Footer />
      </div>
    </RoleBasedAccess>
  );
};

export default Page;
