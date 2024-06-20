import React from "react";
import comedy from "@/public/landingpage/icons/icons8-comedy-100 (1).png";
import horror from "@/public/landingpage/icons/icons8-horror-100 (1).png";
import exhibition from "@/public/landingpage/icons/icons8-exhibition-100 (1).png";
import sports from "@/public/landingpage/icons/icons8-sport-96.png";
import seminar from "@/public/landingpage/icons/icons8-training-100 (1).png";
import concert from "@/public/landingpage/icons/icons8-concert-100 (1).png";
import Image from "next/image";
type OnCloseHandler = () => void;

const Filter = ({ onClose }: { onClose: OnCloseHandler }) => {
  return (
    <div className="py-5 px-2">
      <div className="flex justify-between items-center">
        <p className="text-[20px] font-[600] ">Filter</p>
        <button onClick={onClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1.6em"
            width="1.6em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
          </svg>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 ">
        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={seminar} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Seminar</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={concert} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Concert</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={horror} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Horror</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={comedy} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Comedy</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={exhibition} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Exhibition</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src={sports} alt="seminar.webp" className="w-7" />
            <p className="text-[12px]">Sport</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
