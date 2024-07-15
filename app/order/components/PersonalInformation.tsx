"use client";

import { Award, Calendar, MapPin, Medal } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  ErrorMessage,
  FormikHelpers,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { formatToIDR } from "@/lib/formatToIDR";
import TotalPrice from "./TotalPrice";
import OrderForm from "./OrderForm";

const PersonalInformation = ({
  className,
  ticketPrice,
}: {
  className: string;
  ticketPrice: number;
}) => {
  // const [notification, setNotification] = useState<string | null>(null);
  const { isSubmitting, values, setFieldValue, initialValues } =
    useFormikContext<FormikValues>();

  return (
    // check
    <div className={className}>
      <h1 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2">
        Contact Details
      </h1>
      <p className="text-xs md:text-sm text-gray-400 mb-3">
        Fill in this form correctly. We&#39;ll send the e-ticket to the email
        address as declared on this page.
      </p>

      <div>
        <div
          className="border-[1px] border-gray-400 p-6 rounded-3xl mb-10 bg-white"
          style={{ boxShadow: "0 0 20px 0 rgba(48, 49, 53, .16)" }}
        >
          <div>
            {" "}
            <div className="gap-5 flex flex-col">
              <div className="flex gap-5 md:gap-20 ">
                <div>Personal information</div>
                {/* <div className=" flex items-center gap-1 md:gap-3">
                  <label className="flex">
                    <Field
                      type="radio"
                      name="ticketType"
                      value="Mr."
                      className="size-4 md:size-5 "
                    />
                  </label>
                  <p className="text-sm md:text-lg">Mr.</p>
                </div>

                <div className=" flex items-center gap-1 md:gap-3">
                  <label className="flex">
                    <Field
                      type="radio"
                      name="ticketType"
                      value="Mrs."
                      className="size-4 md:size-5"
                    />
                  </label>
                  <p className="text-sm md:text-lg">Mrs.</p>
                </div>

                <div className=" flex items-center gap-1 md:gap-3">
                  <label className="flex">
                    <Field
                      type="radio"
                      name="ticketType"
                      value="Ms."
                      className="size-4 md:size-5"
                    />
                  </label>
                  <p className="text-sm md:text-lg">Ms.</p>
                </div> */}
              </div>

              <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                <label
                  className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                  htmlFor="name"
                >
                  Full name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="text-slate-500 text-[12px] md:text-[14px]"
                />
                <div className="flex justify-end">
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-[10px] md:text-[12px] text-red-800 pt-1 italic"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                <label
                  htmlFor="phone"
                  className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="text-slate-500 text-[12px] md:text-[14px]"
                />
                <div className="flex justify-end">
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-[10px] md:text-[12px] text-red-800 pt-1 italic"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                <label
                  htmlFor="email"
                  className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="text-slate-500 text-[12px] md:text-[14px]"
                />
                <div className="flex justify-end">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[10px] md:text-[12px] text-red-800 pt-1 italic"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                <label
                  htmlFor="identityCard"
                  className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                >
                  Identity Card Number
                </label>
                <Field
                  type="identityCard"
                  name="identityCard"
                  className="text-slate-500 text-[12px] md:text-[14px]"
                />
                <div className="flex justify-end">
                  <ErrorMessage
                    name="identityCard"
                    component="div"
                    className="text-[10px] md:text-[12px] text-red-800 pt-1 italic"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* {notification && <p>{notification}</p>} */}
        </div>

        <h2 className="font-semibold text-lg md:text-2xl mb-1 md:mb-2">
          Ticket Amount
        </h2>
        <p className="text-gray-400 text-xs md:text-sm mb-3">
          Enter the desired ticket quantity in the Ticket Amount field.
        </p>
        <div
          style={{ boxShadow: "0 0 20px 0 rgba(48, 49, 53, .16)" }}
          className="border-transparent rounded-2xl bg-transparent overflow-hidden "
        >
          <div className="bg-gradient-to-r from-[#18dc9b] to-[#6e54ef] p-2 md:p-4 text-white text-[10px] md:text-sm font-normal md:justify-center flex items-center gap-2 rounded-t-2xl">
            <Award></Award>
            <p>
              {" "}
              You&#39;re one step closer to get{" "}
              <span className="font-semibold">Lowest Price Guarantee</span>
            </p>
          </div>

          <div className="border-[1px] border-gray-400 p-4 md:p-6 bg-white ">
            <h2 className="text-sm md:text-lg font-semibold mb-2">
              Ticket quantity
            </h2>
            <div className="">
              {" "}
              <div className="flex items-center justify-between p-3 md:p-4 border-[1px] border-gray-400 rounded-xl">
                <p className="text-xs md:text-sm font-semibold">Pax</p>
                <div className="flex gap-2 md:gap-8 font-semibold text-gray-500">
                  <p className="text-xs md:text-sm flex items-center">
                    <span className="text-[#f15c59] font-semibold text-xs md:text-base">
                      {formatToIDR(ticketPrice)}
                    </span>
                    /pax
                  </p>
                  <div className="flex gap-2 md:gap-5">
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("ticketAmount", values.ticketAmount + 1)
                      }
                    >
                      +
                    </button>

                    <p className="flex items-center text-sm md:text-base">
                      {values.ticketAmount}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "ticketAmount",
                          Math.max(1, values.ticketAmount - 1)
                        )
                      }
                      disabled={values.ticketAmount <= 1}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-x border-b border-gray-400 p-4 md:p-6 rounded-b-2xl flex gap-2 md:gap-0 flex-col md:flex-row justify-center md:justify-between items-center bg-white">
            <p className="font-semibold text-base md:text-xl">
              {formatToIDR(values.ticketAmount * ticketPrice)}
            </p>
            <div>
              {" "}
              <ErrorMessage
                name="ticketAmount"
                component="div"
                className="text-[12px] text-red-800 pt-1 italic"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#007cff] text-white py-2 md:py-3 px-3 md:px-9   rounded font-semibold disabled:bg-gray-300 text-[11px] md:text-xl"
              >
                {isSubmitting ? "Submitting..." : "Continue to payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
