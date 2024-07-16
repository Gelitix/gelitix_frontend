import React from "react";
import Location from "../../../components/Icons/Location";

import Label from "../../../components/Labels/Label";
import PackageCard from "./PackageCard";
import { Calendar } from "lucide-react";
import EventInfo from "./EventInfo";
import { formatTime, formatDate } from "@/app/helpers/dateUtil";
import { EventProps } from "@/types/eventProps";
import { TicketType } from "./PackageCard";
interface EventDetail {
  event: EventProps;
}
const EventDetail: React.FC<EventDetail> = ({ event }) => {
  const startFrom = event?.ticketTypes[0].price;

  return (
    <div>
      <div className="pt-16">
        <section
          id="overview"
          className="flex justify-center items-center w-3/4 p-8 mx-auto"
        >
          <div className="w-full">
            <div className="flex justify-between items-center mb-7 ">
              <h2 className="text-4xl font-semibold text-left ">
                {event.name}
              </h2>
              <Label text="Lowest Price Guarantee" />
            </div>

            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col">
                <div>
                  <div className="flex gap-4">
                    <Location />
                    <p>{event.location}</p>
                  </div>
                </div>
                <div className="pt-5 flex gap-5">
                  <Calendar />
                  <p>{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex gap-4 text-lg">
                  <p className="text-gray-400 text-right font-semibold">
                    Starts From{" "}
                  </p>
                  <h2 className="text-red-600 text-right font-semibold">
                    IDR {startFrom}
                  </h2>
                </div>

                <button className="border-none bg-blue-500 text-white px-8 py-3 rounded-xl text-lg ml-auto">
                  See Package
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="package" className="px-64 mt-20">
          <h2 className="text-3xl font-semibold mb-4">Package</h2>
          {event.ticketTypes.map((ticketType, index) => (
            <PackageCard key={index} eventId={event.id} ticket={ticketType} />
          ))}
        </section>

        <section id="description" className="px-64 py-20 bg-gray-100 mt-32">
          <h2 className="text-3xl font-semibold mb-4">Description</h2>
          {event.description}
        </section>

        <section id="more" className="px-64 mt-24 mb-32 ">
          <div className="">
            <h2 className="text-3xl font-semibold">Gelitix Features</h2>
            <EventInfo />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
