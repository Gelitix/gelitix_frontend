import React from "react";
import PersonalInformation from "./components/PersonalInformation";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";
import Footer from "@/components/footer/Footer";

const page = () => {
  return (
    <div className="">
      <div className=" bg-[#F4F7FE]">
        {" "}
        <OrderForm />
      </div>
      <Footer />
    </div>
  );
};

export default page;
