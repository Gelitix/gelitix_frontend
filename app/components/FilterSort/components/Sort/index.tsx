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
import { SortAsc, SortDesc } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";

const Sort = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex gap-[8px] items-center border-[1px] border-gray-300 rounded-full py-2 px-4">
            <div className="flex">
              <SortAsc className="size-4  fill-gray-400 text-gray-400" />
              <SortDesc className="size-4  fill-gray-400 text-gray-400" />
            </div>
            <p className="text-[18px]">Sort</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white w-1/4">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <p className="text-[20px]">Sort</p>
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
              <div className="flex flex-col gap-8">
                {" "}
                <div className="flex gap-5 items-center">
                  {" "}
                  <Checkbox className="size-6 rounded-full" />
                  <p className="text-[16px]">Lowest Price </p>
                </div>
                <div className="flex gap-5 items-center">
                  {" "}
                  <Checkbox className="size-6 rounded-full" />
                  <p className="text-[16px]">Highest Price </p>
                </div>
                <div className="flex gap-5 items-center">
                  {" "}
                  <Checkbox className="size-6 rounded-full" />
                  <p className="text-[16px]">Newly Added </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sort;
