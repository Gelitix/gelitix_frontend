import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";
import { FilterIcon } from "lucide-react";
import Image from "next/image";
import seminar from "@/public/landingpage/icons/icons8-training-100 (1).png";
import exhibition from "@/public/landingpage/icons/icons8-exhibition-100 (1).png";
import horror from "@/public/landingpage/icons/icons8-horror-100 (1).png";
import concert from "@/public/landingpage/icons/icons8-concert-100 (1).png";
import sports from "@/public/landingpage/icons/icons8-sport-96.png";
import comedy from "@/public/landingpage/icons/icons8-comedy-100 (1).png";

const Filter = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex gap-[8px] items-center border-[1px] border-gray-300 rounded-full py-2 px-4">
            <FilterIcon className="size-4  fill-gray-300 text-gray-300" />
            <p className="text-[16px]">Filter</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <p className="text-[20px]">Filter</p>
              <AlertDialogCancel className="border-0 ">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                >
                  <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                </svg>
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex justify-center gap-6">
                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image
                      src={seminar}
                      alt="seminar.png"
                      className="size-12"
                    />
                  </div>
                  <p>Seminar</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image
                      src={exhibition}
                      alt="exhibition.png"
                      className="size-12"
                    />
                  </div>
                  <p>Exhibition</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image src={horror} alt="horror.png" className="size-12" />
                  </div>
                  <p>Horror</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image
                      src={concert}
                      alt="concert.png"
                      className="size-12"
                    />
                  </div>
                  <p>Concert</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image src={sports} alt="sports.png" className="size-12" />
                  </div>
                  <p>Sports</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center">
                  {" "}
                  <div className="p-4 bg-white border-2 border-[#0064D2] rounded-full hover:opacity-50 transition-all duration-200">
                    {" "}
                    <Image src={comedy} alt="comedy.png" className="size-12" />
                  </div>
                  <p>Comedy</p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Filter;
