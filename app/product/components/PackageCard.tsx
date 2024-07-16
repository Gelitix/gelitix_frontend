// components/PackageCard.js

import React from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface PackageCardProps {
  eventId: string;
  ticket: TicketType;
}

const PackageCard: React.FC<PackageCardProps> = ({ eventId, ticket }) => {
  const router = useRouter();

  const handleSelectTicket = () => {
    const queryString = new URLSearchParams({
      eventId: eventId,
      ticketTypeId: ticket.id,
    }).toString();

    router.push(`/order?${queryString}`);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="h-min w-3/4">
        <div className="flex justify-start p-5">
          {/* <h3 className="font-bold">Packages</h3> */}
        </div>
        <div className=" bg-gray-100 p-7 rounded-xl border-none">
          <div className="flex flex-col text-left bg-white rounded-xl p-5">
            <h4 className="font-semibold text-xl mb-4">{ticket.name}</h4>
            <div className="flex gap-5 items-center">
              <Users size={20} className="col-span-1 w-32 h-fit" />{" "}
              <p className="col-span-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="flex justify-between items-center p-5">
              <div className="flex justify-between gap-3">
                <p className="font-semibold">Ticket's left:</p>
                <p className="text-blue-600 font-bold ">{ticket.quantity}</p>
              </div>

              <div className="flex gap-3 items-center">
                <p className="text-red-500 text-left px-6  font-semibold">
                  IDR {ticket.price}
                </p>
                <button
                  className=" border-none border-blue-700 bg-blue-500 text-white px-6 py-3 rounded-xl"
                  onClick={handleSelectTicket}
                >
                  Select Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
