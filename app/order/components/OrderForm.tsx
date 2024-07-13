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
import { useState } from "react";
import TotalPrice from "./TotalPrice";
import { Award } from "lucide-react";
import PersonalInformation from "./PersonalInformation";

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
const ticketPrice: number = 3050000;

const OrderForm = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    identityCard: "",
    ticketType: "",
    ticketAmount: 1,
  };

  const handleSubmit = (
    values: FormikValues,
    { resetForm }: FormikHelpers<any>
  ) => {
    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setNotification("Form submitted successfully!");
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification("Failed to submit form. Please try again.");
      });
  };
  const ticketPrice: number = 3050000;

  return (
    <div className=" md:px-72 pb-10 md:py-20">
      {" "}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="md:grid grid-cols-6 gap-10">
          <div className="bg-white block md:hidden px-6 py-6">
            {" "}
            <TotalPrice
              className="col-span-2  mb-0 md:mb-10 md:hidden"
              ticketPrice={ticketPrice}
            />
          </div>

          <PersonalInformation
            className="px-6 md:px-0 col-span-4 mt-4 md:mt-0"
            ticketPrice={ticketPrice}
          />
          <TotalPrice
            className="col-span-2 hidden md:block"
            ticketPrice={ticketPrice}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default OrderForm;
