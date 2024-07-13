import React from "react";
import Image from "next/image";
import card from "@/public/landingpage/cards-1.webp";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import NavBar from "@/components/NavBar";

const Invoice = () => {
  return (
    <section>
      <NavBar />{" "}
      <div className="px--4 md:px-72 bg-[#f4f7fe] py-0 md:py-10">
        <div
          className="bg-white rounded-none md:rounded-2xl px-8 py-12"
          style={{ boxShadow: "0 10px 10px -10px rgba(48, 49, 53, .16)" }}
        >
          <h1 className="font-semibold text-xl md:text-[24px]">
            Payment Successful
          </h1>

          <div className="mt-6 md:mt-10">
            {" "}
            <h2 className="font-semibold text-sm md:text-[18px] mb-3">
              Order Summary
            </h2>
            <div>
              {" "}
              <div className="flex items-center gap-4 md:gap-8 border-[1px] border-gray-400 p-4 md:p-6 rounded-2xl">
                <Image
                  src={card}
                  alt="banner1.webp"
                  className="w-20 h-fit rounded-2xl"
                />
                <div>
                  <p className="font-semibold md:text-base text-xs mb-2 md:mb-0">
                    ALL-4-ONE 30 YEARS ANNIVERSARY TOUR
                  </p>
                  <p className="md:text-base text-xs">
                    CENTRAL JAKARTA, JAKARTA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-10 ">
            <h2 className="font-semibold text-sm md:text-[18px] mb-3">
              {" "}
              Package Details
            </h2>
            <div className="border-[1px] border-gray-400 p-4 md:p-6 rounded-2xl flex flex-col gap-3">
              <p className="border-dashed border-b-[1px] border-gray-400 pb-2 md:pb-4 text-xs md:text-base">
                Category 4 - Presale
              </p>
              <p className="border-dashed border-b-[1px] border-gray-400 pb-2 md:pb-4 text-xs md:text-base">
                <span className="font-semibold">Validity Period</span> <br />
                Sat, 03 Aug 2024
              </p>
              <p className="text-xs md:text-base">
                <span className="font-semibold">Contact Info</span> <br />
                MR.Hizkia Sihombing
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 md:mt-10">
            {" "}
            <Link
              href="/"
              className="p-3 md:p-4 bg-[#0064d2] hover:opacity-80 transition-all duration-200 rounded-xl text-white font-semibold text-xs md:text-xl"
            >
              {" "}
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Invoice;
