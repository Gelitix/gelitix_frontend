"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import ImageUpload from "@/app/dashboard/components/ImageUpload";
import { Button } from "@/components/ui/Button";

interface EventFormValues {
  eventName: string;
  price: number;
  date: string;
  time: string;
  location: string;
  description: string;
  availableSeats: number;
  ticketType: string;
}

const initialValues: EventFormValues = {
  eventName: "",
  price: 0,
  date: "",
  time: "",
  location: "",
  description: "",
  availableSeats: 0,
  ticketType: "",
};

const validationSchema = Yup.object({
  eventName: Yup.string().required("Required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  availableSeats: Yup.number()
    .min(1, "Available seats must be at least 1")
    .required("Required"),
  ticketType: Yup.string().required("Required"),
});

const handleSubmit = (values: EventFormValues) => {
  console.log("Form data", values);
};

const CreateEventPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#d3e8ff] p-5">
      <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md md:p-8">
        <div className="flex justify-start items-start my-4">
          <img
            src="/Tiket.png"
            width={100}
            height={50}
            className="items-center"
          />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-left text-gray-800 md:text-3xl">
          Create Event
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="eventName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Event Name
              </label>
              <Field
                type="text"
                id="eventName"
                name="eventName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="eventName"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <Field
                type="time"
                id="time"
                name="time"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Field
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                rows={4}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <ImageUpload />
            </div>
            <div>
              <label
                htmlFor="availableSeats"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Available Seats
              </label>
              <Field
                type="number"
                id="availableSeats"
                name="availableSeats"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <ErrorMessage
                name="availableSeats"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="ticketType"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Ticket Type
              </label>
              <Field
                as="select"
                id="ticketType"
                name="ticketType"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="">Select Ticket Type</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </Field>
              <ErrorMessage
                name="ticketType"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div className="py-4">
              <Button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Create Event
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateEventPage;
