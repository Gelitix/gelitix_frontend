import React from "react";
import Image, { StaticImageData } from "next/image";
interface CardsProps {
  banner: StaticImageData;
  title: string;
  date: string;
  place: string;
  price: string;
}

const Card: React.FC<CardsProps> = ({ banner, title, date, place, price }) => {
  return (
    <section className="mx-[30px] md:mx-0">
      <div className="border rounded-xl shadow-xl">
        <div className="">
          <div className="bg-gray-200 flex justify-center rounded-t-xl">
            <Image src={banner} alt="banner1.webp" className="w-[230px]" />
          </div>
          <div className="p-4 text-[11px]">
            <p className="font-[600] text-[15px] md:mb-1">{title}</p>
            <p>{date}</p>
            <p>{place}</p>
            <div className="flex justify-between mt-[15px] items-center">
              <p className="text-[11px] font-[600] text-green-600">
                Available Now
              </p>{" "}
              <p className="text-end text-red-700 font-[600] text-[14px]">
                IDR {price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
