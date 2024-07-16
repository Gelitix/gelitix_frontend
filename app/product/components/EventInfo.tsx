import Terms from "@/components/Icons/Terms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

import React from "react";

const EventInfo = () => {
  return (
    <div className="px-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-2 items-start">
            <img
              src="https://assets-bucket.tiket.com/to-do/v2.32.0/_next/static/media/ic_eticket_general.8bc3c41a.svg"
              alt="Accessible Icon"
              className="h-6 w-6"
            />
            <p className="text-left text-lg font-semibold">Safety Guarantee</p>
          </AccordionTrigger>
          <AccordionContent className="text-sm px-28">
            We prioritize your security by implementing advanced encryption
            methods and secure payment gateways, ensuring that your personal and
            financial information is always protected.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex flex-row gap-2">
            <Terms />
            <span className="text-lg font-semibold">Easy Access</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm px-28">
            Our user-friendly platform allows you to effortlessly browse,
            purchase, and manage your tickets. With a seamless interface, you
            can find the events you love and complete transactions in just a few
            clicks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="flex flex-row gap-2">
            <img
              src="https://assets-bucket.tiket.com/to-do/v2.32.0/_next/static/media/icon-additional-info.4d1b306f.svg"
              alt="Additional Info Icon"
              className="h-6 w-6"
            />
            <span className="text-lg font-semibold">Customer Support</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm px-28">
            Our dedicated customer support team is available 24/7 to assist you
            with any inquiries or issues. Whether you need help with booking or
            have questions about an event, we are here to provide prompt and
            reliable assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EventInfo;
