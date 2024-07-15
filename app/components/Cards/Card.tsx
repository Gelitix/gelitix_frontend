import React from "react";
import Image, { StaticImageData } from "next/image";
interface TicketType {
  name: string;
  price: number;
  quantity: number;
}

interface CardsProps {
  id: number;
  imageUrl: string;
  name: string;
  date: string;
  location: string;
  ticketTypes: TicketType[];
}

const Card: React.FC<CardsProps> = ({
  imageUrl,
  name,
  date,
  location,
  ticketTypes,
}) => {
  const lowestPrice = ticketTypes[0].price;

  return (
    <section className="mx-[30px] md:mx-0">
      <div className="border rounded-xl shadow-xl">
        <div className="">
          <div className="bg-gray-200 flex justify-center rounded-t-xl">
            <Image
              src={imageUrl}
              width={230}
              height={100}
              alt="banner1.webp"
              className="w-[230px] h-[150px]"
            />
          </div>
          <div className="p-4 text-[11px]">
            <p className="font-[600] text-[15px] md:mb-1">{name}</p>
            <p>{date}</p>
            <p>{location}</p>
            <div className="flex justify-between mt-[15px] items-center">
              <p className="text-[11px] font-[600] text-green-600">
                Available Now
              </p>{" "}
              <p className="text-end text-red-700 font-[600] text-[14px]">
                IDR {lowestPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
