import React from "react";
import PersonalInformation from "./components/PersonalInformation";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/NavBar";

const page = () => {
  return (
    <div className="">
      <div className=" bg-[#F4F7FE]">
        <NavBar />
        <OrderForm />
      </div>
      <Footer />
    </div>
  );
};

export default page;
