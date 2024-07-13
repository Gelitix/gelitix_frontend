"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER" as "ROLE_USER" | "ROLE_EVENT_ORGANIZER",
    phoneNumber: "",
    referredCode: "",
    name: "",
    profileImage: null as File | null,
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
      .oneOf(["ROLE_USER", "ROLE_EVENT_ORGANIZER"], "Invalid role")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(5, "Phone number must be at least 5 characters")
      .required("Required"),
    referredCode: Yup.string().min(
      6,
      "Referral code must be at least 6 characters"
    ),
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setError(null);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "profileImage" && values[key]) {
        formData.append(key, values[key] as File);
      } else {
        formData.append(
          key,
          values[key as keyof typeof values]?.toString() || ""
        );
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.imageUrl) {
        setUploadedImageUrl(data.imageUrl);
      }
      // Uncomment the following line if you want to redirect immediately after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/register/register.png"
        fill
        style={{ objectFit: "cover" }}
        alt="Register Cover"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-screen-xl px-6 md:px-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="mx-auto max-w-2xl rounded-lg border bg-white bg-opacity-90 p-6 md:p-10">
                <div className="flex flex-col gap-4">
                  <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                    Register
                  </h2>
                  {error && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}

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
                      <option value="ROLE_USER">User</option>
                      <option value="ROLE_EVENT_ORGANIZER">
                        Event Organizer
                      </option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="referredCode"
                      className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                    >
                      Referral Code (Optional)
                    </label>
                    <Field
                      type="text"
                      name="referredCode"
                      id="referredCode"
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    />
                    <ErrorMessage
                      name="referredCode"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profileImage"
                      className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        setFieldValue("profileImage", file || null);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setImagePreview(null);
                        }
                      }}
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="max-w-xs rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="block rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {uploadedImageUrl && (
            <div className="mt-4 bg-white bg-opacity-90 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Uploaded Profile Image:
              </h3>
              <img
                src={uploadedImageUrl}
                alt="Uploaded Profile"
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
