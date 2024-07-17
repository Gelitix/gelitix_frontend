"use client";

import { Award, Calendar, MapPin, Medal, TicketPercent } from "lucide-react";
import React, { useState, useEffect } from "react";
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
  FormikErrors,
  FormikState,
  FormikTouched,
} from "formik";
import * as Yup from "yup";
import { formatToIDR } from "@/lib/formatToIDR";
import TotalPrice from "./TotalPrice";
import OrderForm from "./OrderForm";
import { formatDate } from "@/app/helpers/dateUtil";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import { profile } from "console";

interface PromoDetails {
  name: string;
  discount: string;
  startValid: string;
  endValid: string;
}

interface ProfileData {
  pointBalance: number;
  name?: string;
  email?: string;
}

interface PersonalInformationProps {
  className: string;
  ticket: any; // Consider creating a more specific type for ticket
  event: any; // Consider creating a more specific type for event
  onSubmit: () => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  className,
  ticket,
  event,
  onSubmit,
}) => {
  // console.log("PersonalInformation rendering");
  const { submitForm } = useFormikContext();
  const { data: session, status } = useSession();
  const [promoDetails, setPromoDetails] = useState<PromoDetails[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [pointUsed, setPointUsed] = useState<number>(0);
  const { isSubmitting, values, setFieldValue, initialValues } =
    useFormikContext<FormikValues>();

  useEffect(() => {
    console.log("Formik values:", values);
  }, [values]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session && session.accessToken) {
        try {
          const response = await fetch(
            "http://localhost:8080/api/v1/user/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProfileData(data.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session]);

  // useEffect(() => {
  //   console.log("PersonalInformation useEffect running");
  //   console.log("PersonalInformation values:", values);
  // }, [values]);

  useEffect(() => {
    const fetchPromoDetails = async () => {
      if (event && event.id && session) {
        try {
          const userId = session.user.id;
          const eventId = event.id;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/promo-detail/${userId}/${eventId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: PromoDetails = await response.json();
          setPromoDetails(data as unknown as PromoDetails[]);
        } catch (error) {
          console.error("Error fetching promo details:", error);
        }
      }
    };
    console.log(promoDetails);
    fetchPromoDetails();
  }, [event, session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You must be logged in to view this page.</div>;
  }

  if (!ticket || typeof ticket.price === "undefined") {
    return <div>Loading ticket details...</div>;
  }

  const pointFill = (point: any) => {
    if (point > (profileData?.pointBalance || 0)) {
      point = profileData?.pointBalance;
    }
    setPointUsed(point);
  };

  return (
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
            <div className="gap-5 flex flex-col">
              <div className="flex gap-5 md:gap-20 ">
                <div>Personal information</div>
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
                  onBlur={(e: any) => setFieldValue("fullname", e.target.value)}
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
                  onBlur={(e: any) =>
                    setFieldValue("phoneNumber", e.target.value)
                  }
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
                  onChange={(e: any) => setFieldValue("email", e.target.value)}
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
              You&#39;re one step closer to get{" "}
              <span className="font-semibold">Lowest Price Guarantee</span>
            </p>
          </div>

          <div className="border-[1px] border-gray-400 p-4 md:p-6 bg-white ">
            <h2 className="text-sm md:text-lg font-semibold mb-2">
              Ticket quantity
            </h2>
            <div className="">
              <div className="flex items-center justify-between p-3 md:p-4 border-[1px] border-gray-400 rounded-xl">
                <p className="text-xs md:text-sm font-semibold">Pax</p>
                <div className="flex gap-2 md:gap-8 font-semibold text-gray-500">
                  <p className="text-xs md:text-sm flex items-center">
                    <span className="text-[#f15c59] font-semibold text-xs md:text-base">
                      {ticket && ticket.price
                        ? formatToIDR(ticket.price)
                        : "Price not available"}
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
              {ticket && ticket.price
                ? formatToIDR(values.ticketAmount * ticket.price)
                : "Total not available"}
            </p>
            <div>
              <ErrorMessage
                name="ticketAmount"
                component="div"
                className="text-[12px] text-red-800 pt-1 italic"
              />
              <button
                className="bg-[#007cff] text-white py-2 md:py-2 px-3 md:px-4 mr-4 rounded font-semibold disabled:bg-gray-300 text-[11px] md:text-sm"
                onClick={() => setIsOpen(true)}
              >
                Use Promo
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#007cff] text-white py-2 md:py-2 px-3 md:px-4   rounded font-semibold disabled:bg-gray-300 text-[11px] md:text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-3xl mb-5">Promo </DrawerTitle>
            <DrawerDescription>
              {promoDetails ? (
                //@ts-ignore
                promoDetails.data.map((promo: PromoDetails, index: number) => (
                  <div
                    className="text-lg flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex gap-24 items-center">
                      <div className="flex gap-5">
                        <TicketPercent size={40} />
                        <div className="flex gap-10 items-center">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {promo.name}
                          </p>
                          <p>
                            <span className="font-semibold">Discount:</span>{" "}
                            {promo.discount}%
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Valid Date:</span>{" "}
                          {formatDate(promo.startValid)} -{" "}
                          {formatDate(promo.endValid)}
                        </p>
                      </div>
                    </div>

                    <Button className="border-[1px] text-lg font-semibold border-black">
                      Use Promo
                    </Button>
                  </div>
                ))
              ) : (
                <div>No promo exists for this event</div>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div
        className="border-[1px] border-gray-400 p-6 px-8 rounded-3xl mb-10 bg-white mt-16 "
        style={{ boxShadow: "0 0 20px 0 rgba(48, 49, 53, .16)" }}
      >
        {profileData ? (
          // Display profile data
          <div className="flex justify-between">
            <p className="text-xl font-semibold">
              {" "}
              Point Balance: {profileData.pointBalance}
            </p>

            <div className="flex gap-3">
              {" "}
              <input
                type="number"
                max={profileData.pointBalance}
                min={0}
                placeholder="Insert points here"
                className="w-44"
                onBlur={(e) => pointFill(Number(e.target.value))}
              />
              <button
                className="bg-[#007cff] text-white font-semibold p-2 px-4 rounded-[10px]"
                onClick={() => setFieldValue("pointUsed", pointUsed)}
                type="button"
              >
                Apply Points
              </button>
            </div>
          </div>
        ) : (
          <p>Loading point balance...</p>
        )}{" "}
      </div>
    </div>
  );
};

export default PersonalInformation;
