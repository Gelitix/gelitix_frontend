// pages/login.tsx
"use client";
import React from "react";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const page: React.FC = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    role: Yup.string()
      .oneOf(["user", "organizer"], "Invalid role")
      .required("Required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/register.png"
        fill
        style={{ objectFit: "cover" }}
        alt="Login Cover"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-screen-xl px-6 md:px-10">
          {" "}
          {/* Adjusted max-width and padding */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mx-auto max-w-2xl rounded-lg border bg-white bg-opacity-90 p-6 md:p-10">
              {" "}
              {/* Adjusted max-width and padding */}
              <div className="flex flex-col gap-4">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                  Register
                </h2>

                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    id="role"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  >
                    <option value="user">User</option>
                    <option value="organizer">Event Organizer</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="block rounded-lg bg-blue-500 px-8 py-3 mt-5 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                >
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default page;
