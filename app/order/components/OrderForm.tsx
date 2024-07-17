"use client";
import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { formatToIDR } from "@/lib/formatToIDR";
import { useEffect, useState } from "react";
import TotalPrice from "./TotalPrice";
import { Award } from "lucide-react";
import PersonalInformation from "./PersonalInformation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const validationSchema = Yup.object({
  name: Yup.string().min(4, "Please Enter Your Fullname").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  identityCard: Yup.string()
    .matches(/^[0-9]+$/, "Must be exactly 16 digits")
    .min(16, "Must be exactly 16 digits")
    .max(16, "Must be exactly 16 digits")
    .required("Required"),
  ticketType: Yup.string().required("Ticket type is required"),
  ticketAmount: Yup.number()
    .required("Required")
    .min(1, "At least one ticket is required"),
});

interface OrderFormProps {
  eventId: string | null;
  ticketTypeId: string | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ eventId, ticketTypeId }) => {
  const { data: session, status } = useSession();
  const [notification, setNotification] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (eventId && ticketTypeId) {
        setIsLoading(true);
        try {
          const [ticketRes, eventRes] = await Promise.all([
            fetch(`http://localhost:8080/api/v1/ticket-type/${ticketTypeId}`),
            fetch(`http://localhost:8080/api/v1/events/${eventId}`),
          ]);

          if (!ticketRes.ok || !eventRes.ok) {
            throw new Error("Network response was not ok");
          }

          const [ticketData, eventData] = await Promise.all([
            ticketRes.json(),
            eventRes.json(),
          ]);
          console.log(ticketData);
          console.log(eventData);
          setTicketDetails(ticketData.data);
          setEventDetails(eventData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setError(
            "Failed to fetch event and ticket details. Please try again."
          );
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [eventId, ticketTypeId]);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    identityCard: "",
    ticketType: "",
    ticketAmount: 1,
  };

  const handleSubmit = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<any>
  ) => {
    if (!session) {
      setNotification("You must be logged in to place an order.");
      return;
    }
    console.log(values);
    const orderData = {
      fullName: values.fullname,
      phoneNumber: values.phoneNumber,
      email: values.email,
      identityCard: values.identityCard,
      ticketQuantity: values.ticketAmount,
      eventId: eventId,
      ticketTypeId: ticketTypeId,
      pointUsed: values.pointUsed,
      promoId: values.promoId,
    };

    console.log(orderData);

    try {
      const response = await fetch("http://localhost:8080/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setNotification("Order submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      setNotification("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="md:px-72 pb-10 md:py-20">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form className="md:grid grid-cols-6 gap-10">
            <div className="bg-white block md:hidden px-6 py-6">
              <TotalPrice
                className="col-span-2 mb-0 md:mb-10 md:hidden"
                ticket={ticketDetails}
                event={eventDetails}
              />
            </div>

            <PersonalInformation
              className="col-span-4"
              ticket={ticketDetails}
              event={eventDetails}
              onSubmit={formikProps.handleSubmit}
            />
            <TotalPrice
              className="col-span-2 hidden md:block"
              ticket={ticketDetails}
              event={eventDetails}
            />
          </Form>
        )}
      </Formik>
      {notification && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
          {notification}
        </div>
      )}
    </div>
  );
};

export default OrderForm;
