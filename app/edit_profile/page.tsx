"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

const EditProfile = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const initialValues = {
    name: "e.g. John Doe", // Example initial value, replace with actual user data
    phone: "e.g. 1234567890", // Example initial value, replace with actual user data
    email: "e.g. john.doe@example.com", // Example initial value, replace with actual user data
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
        // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotification("Failed to submit form. Please try again.");

        // Handle error
      });
  };
  return (
    <section className="bg-white md:bg-gradient-to-br from-white to-[#d3e8ff] min-h-screen flex items-center">
      <div>
        <div className="py-10 px-4 md:px-72 md:grid grid-cols-7">
          <div className="col-span-2 flex flex-col gap-1 mb-6 md:mb-0">
            <div className="flex items-center justify-between md:block">
              {" "}
              <Image
                src={logo}
                alt="logo.webp"
                className="w-20 h-fit md:w-24 pos order-2 md:order-1"
              />
              <h1 className="text-[20px] md:text-[23px] font-semibold order-1 md:order-2">
                Account Center
              </h1>
            </div>
            <p className="text-[12px] md:text-sm">
              Any changes you make here will also be reflected throughout
              Blibli, tiket.com, and RANCH apps.
            </p>
          </div>
          <div className="col-span-5 border-l-[2px] md:px-6 border-white">
            <h2 className="text-[18px] md:text-[23px] font-semibold mb-1 md:mb-4">
              Profile
            </h2>
            <p className="text-gray-500 text-[12px] md:text-sm">
              All information here is used throughout Blibli, tiket.com and
              RANCH apps.
            </p>

            <div className="bg-white py-4 md:px-6  rounded-2xl ">
              <h2 className="font-semibold text-xs md:text-lg mb-1 md:mb-4">
                Account Owner Info
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                      <label
                        className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                        htmlFor="name"
                      >
                        Full name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="text-slate-500 text-[14px]"
                      />
                      <div className="flex justify-end">
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-[12px] text-red-800 pt-1 italic"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                      <label
                        htmlFor="phone"
                        className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        name="phone"
                        className="text-slate-500 text-[14px]"
                      />
                      <div className="flex justify-end">
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-[12px] text-red-800 pt-1 italic"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                      <label
                        htmlFor="email"
                        className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="text-slate-500 text-[14px]"
                      />
                      <div className="flex justify-end">
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-[12px] text-red-800 pt-1 italic"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="w-fit bg-[#287ad2] text-[12px] md:text-base text-white p-2 md:p-2 px-3 md:px-4 rounded-xl font-semibold"
                        disabled={isSubmitting}
                      >
                        Update Profile
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        <div className="bg-white hidden  md:fixed bottom-0 w-screen md:flex justify-between py-6 px-72">
          <div className="flex gap-4 items-center">
            <Image src={logo} alt="logo.webp" className="w-28" />
          </div>
          <p>© 2023. All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
