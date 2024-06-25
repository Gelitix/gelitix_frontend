import Terms from "@/components/Icons/Terms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const EventInfo = () => {
  return (
    <div>
      <h2 className="pt-5 font-bold">Info Lainnya</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-row items-center gap-2">
            <img
              src="https://assets-bucket.tiket.com/to-do/v2.32.0/_next/static/media/ic_eticket_general.8bc3c41a.svg"
              alt="Accessible Icon"
              className="h-6 w-6"
            />
            <p className="text-left">Is it accessible?</p>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex flex-row items-center gap-2">
            <Terms />
            <span>Is it styled?</span>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="flex flex-row items-center gap-2">
            <img
              src="https://assets-bucket.tiket.com/to-do/v2.32.0/_next/static/media/icon-additional-info.4d1b306f.svg"
              alt="Additional Info Icon"
              className="h-6 w-6"
            />
            <span>Is it animated?</span>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EventInfo;
