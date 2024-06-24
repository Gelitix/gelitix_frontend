import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import banner1 from "@/public/landingpage/Carousel/1.jpg";
import banner2 from "@/public/landingpage/Carousel/2.png";
import banner3 from "@/public/landingpage/Carousel/3.png";
import banner4 from "@/public/landingpage/Carousel/4.png";
import banner5 from "@/public/landingpage/Carousel/5.jpg";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Calendar } from "lucide-react";

const CarouselLanding = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="px-7 mb-10 md:px-72">
      <div className="flex gap-3 items-center mb-4 justify-between ">
        <h2 className="font-[600] text-[18px] md:text-[28px]">
          Check out these events before you go 🤩
        </h2>

        <div className="bg-green-700 p-2 rounded-full">
          <Calendar className="text-white size-6 md:size-10" />
        </div>
      </div>

      <Carousel plugins={[plugin.current]} className="relative ">
        <CarouselPrevious className="absolute -translate-x-1/2 left-0 z-10 bg-white disabled:opacity-100 md:size-14" />
        <CarouselContent className="scroll">
          <CarouselItem className="h-[150px] md:h-[300px]">
            <Image
              src={banner1}
              alt="banner1.jpg"
              className="object-cover h-full rounded-2xl"
            />
          </CarouselItem>

          <CarouselItem className="h-[150px] md:h-[300px]">
            <Image
              src={banner2}
              alt="banner2.jpg"
              className="object-cover h-full rounded-2xl  "
            />
          </CarouselItem>

          <CarouselItem className="h-[150px] md:h-[300px]">
            <Image
              src={banner3}
              alt="banner3.jpg"
              className="object-cover h-full rounded-2xl  "
            />
          </CarouselItem>

          <CarouselItem className="h-[150px] md:h-[300px]">
            <Image
              src={banner4}
              alt="banner4.jpg"
              className="object-cover h-full rounded-2xl  "
            />
          </CarouselItem>

          <CarouselItem className="h-[150px] md:h-[300px]">
            <Image
              src={banner5}
              alt="banner5.jpg"
              className="object-cover h-full rounded-2xl  "
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="absolute translate-x-1/2 right-0 z-30 bg-white disabled:opacity-100 md:size-14" />
      </Carousel>
    </div>
  );
};

export default CarouselLanding;
