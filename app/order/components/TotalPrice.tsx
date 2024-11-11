"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import image1 from "@/public/landingpage/cards-1.webp";
import Image from "next/image";
import { Hourglass, TicketX, Zap } from "lucide-react";
import { useFormikContext } from "formik";
import { formatToIDR } from "@/lib/formatToIDR";
import { TicketType } from "@/app/product/components/PackageCard";
import { formatTime, formatDate } from "@/app/helpers/dateUtil";

interface FormValues {
  fullname: string;
  phoneNumber: string;
  email: string;
  identityCard: string;
  ticketType: string;
  ticketAmount: number;
  pointUsed: number;
  promoId?: number;
}

const TotalPrice: React.FC<{ className?: string; ticket: any; event: any }> = ({
  className,
  ticket,
  event,
}) => {
  const { values } = useFormikContext<FormValues>();
  console.log(values);

  useEffect(() => {
    console.log("TotalPrice values:", values);
  }, [values]);

  if (!ticket || !event) {
    return <div>Loading ticket details...</div>;
  }
  const descriptionImage = event.imageUrl || "/path/to/default/image.jpg";

  return (
    <div className={className}>
      <div
        className="h-fit rounded-2xl sticky top-8"
        style={{ boxShadow: "0 0 20px 0 rgba(48, 49, 53, .16)" }}
      >
        {" "}
        <div className="bg-white h-fit p-4 rounded-t-2xl">
          <div className="flex gap-4 border-b border-gray-300 pb-3 items-center">
            <Image
              src={descriptionImage}
              alt="banner.webp"
              className="w-20 rounded-xl"
              width={14}
              height={14}
            />
            <p className="font-semibold ">{event.name}</p>
          </div>

          <div className="grid grid-cols-2 text-sm mt-4 border-b border-gray-300 pb-3">
            <div className="col-span-1">
              <p className="text-gray-400">GENERAL</p>
              <p className="flex items-center gap-1">
                {values.ticketAmount}
                <span className="text-4xl h-fit text-gray-400">&#183;</span> Pax
                1
              </p>
            </div>

            <div className="col-span-1 flex flex-col gap-[7px]">
              <p className="text-gray-400">Selected Date</p>
              <p>{formatDate(event.date)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <p className="flex gap-2 items-center text-xs md:text-sm">
              <TicketX className="text-slate-500 size-4"></TicketX>Refund not
              allowed
            </p>
            <p className="flex gap-2 items-center text-xs md:text-sm">
              <Zap className="text-slate-500 size-4"></Zap>Instant Confirmation
            </p>
            <p className="flex gap-2 items-center text-xs md:text-sm">
              <Hourglass className="text-slate-500 size-4"></Hourglass>Valid on
              the selected date
            </p>
          </div>
        </div>
        <div className="flex justify-between bg-white p-4 mt-1 rounded-b-2xl font-semibold items-center">
          <p className="text-xs md:text-sm">Total Payment</p>
          <p className="text-base md:text-xl">
            {formatToIDR(
              values.ticketAmount * (ticket.price || 0) -
                (values.pointUsed || 0)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalPrice;
