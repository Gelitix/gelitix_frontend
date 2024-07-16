"use client";

import React, { useState, useEffect } from "react";
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
import { useSession } from "next-auth/react";

const EditProfile = () => {
  const { data: session } = useSession();
  const [notification, setNotification] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be at least 5 digits")
      .required("Required"),
    profileImage: Yup.mixed(),
  });

  useEffect(() => {
    fetchUserProfile();
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setUserData(data);
      setPreviewImage(data.profilePicture);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setNotification("Failed to load user profile. Please try again.");
    }
  };

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      console.log("Submitting form with values:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phoneNumber", values.phoneNumber);
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user/update-profile`;
      console.log("Sending request to:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log("Success:", data);
      setNotification("Profile updated successfully!");
      fetchUserProfile(); // Refresh user data after update
    } catch {
      console.error("An error occurred while updating the profile");
      setNotification("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white md:bg-gradient-to-br from-white to-[#d3e8ff] min-h-screen flex items-center">
      <div>
        <div className="py-10 px-4 md:px-72 md:grid grid-cols-7">
          <div className="col-span-2 flex flex-col gap-1 mb-6 md:mb-0">
            <div className="flex items-center justify-between md:block">
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
              Any changes you make here will be reflected in your profile.
            </p>
          </div>
          <div className="col-span-5 border-l-[2px] md:px-6 border-white">
            <h2 className="text-[18px] md:text-[23px] font-semibold mb-1 md:mb-4">
              Profile
            </h2>
            <p className="text-gray-500 text-[12px] md:text-sm">
              Update your profile information here.
            </p>

            <div className="bg-white py-4 md:px-6 rounded-2xl">
              <h2 className="font-semibold text-xs md:text-lg mb-1 md:mb-4">
                Account Owner Info
              </h2>
              <Formik
                initialValues={{
                  name: userData.name,
                  phoneNumber: userData.phoneNumber,
                  profileImage: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
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
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-[12px] text-red-800 pt-1 italic"
                      />
                    </div>

                    <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                      <label
                        htmlFor="phoneNumber"
                        className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        name="phoneNumber"
                        className="text-slate-500 text-[14px]"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-[12px] text-red-800 pt-1 italic"
                      />
                    </div>

                    <div className="flex flex-col gap-[1px] border-[1px] border-gray-500 px-3 md:px-4 py-2 md:py-2 rounded-2xl">
                      <label
                        htmlFor="profileImage"
                        className="text-[10px] md:text-[12px] md:mb-1 text-gray-400"
                      >
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                        className="text-slate-500 text-[14px]"
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          className="mt-2 w-32 h-32 object-cover rounded-full"
                        />
                      )}
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

        <div className="bg-white hidden md:fixed bottom-0 w-screen md:flex justify-between py-6 px-72">
          <div className="flex gap-4 items-center">
            <Image src={logo} alt="logo.webp" className="w-28" />
          </div>
          <p>© 2023. All Rights Reserved</p>
        </div>
      </div>
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center">
          {notification}
        </div>
      )}
    </section>
  );
};

export default EditProfile;
