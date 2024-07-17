"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

interface Category {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

interface Event {
  id: any;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  organizer: string;
  eventCategory: string;
  // isFree: boolean;
  // ticketTypes: Array<{
  //   name: string;
  //   price: number;
  //   quantity: number;
  // }>;
  // imageFile: File | null;
}

const initialValues: Event = {
  id: "",
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  description: "",
  organizer: "",
  eventCategory: "",
  // isFree: false,
  // ticketTypes: [{ name: "", price: 0, quantity: 0 }],
  // imageFile: null,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  organizer: Yup.string().required("Required"),
  eventCategory: Yup.string().required("Required"),
  // isFree: Yup.boolean().required("Required"),
  // ticketTypes: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().required("Required"),
  //       price: Yup.number()
  //         .min(0, "Price must be a positive number")
  //         .required("Required"),
  //       quantity: Yup.number()
  //         .min(1, "Quantity must be at least 1")
  //         .required("Required"),
  //     })
  //   )
  //   .min(1, "At least one ticket type is required"),
  // imageFile: Yup.mixed().required("Image is required"),
});

const EditEventPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [eventCategories, setEventCategories] = useState<Category[]>([]);
  const [eventLocations, setEventLocations] = useState<Location[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<Event | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/event-categories`
        );
        if (response.ok) {
          const data = await response.json();
          setEventCategories(data);
        } else {
          console.error("Failed to fetch event categories");
        }
      } catch (error) {
        console.error("Error fetching event categories:", error);
      }
    };

    const fetchEventLocations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/location`
        );
        if (response.ok) {
          const data = await response.json();
          setEventLocations(data);
        } else {
          console.error("Failed to fetch event locations");
        }
      } catch (error) {
        console.error("Error fetching event locations:", error);
      }
    };

    const fetchEvent = async () => {
      if (session?.accessToken && params.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch event");
          }
          const data = await response.json();
          setEvent({
            ...data,
            date: new Date(data.date).toISOString().split("T")[0],
            startTime: new Date(data.startTime).toTimeString().slice(0, 5),
            endTime: new Date(data.endTime).toTimeString().slice(0, 5),
          });
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      }
    };
    fetchEvent();
    fetchEventCategories();
    fetchEventLocations();
  }, [session, params.id]);

  const handleUpdate = async (values: Event) => {
    if (session?.accessToken) {
      try {
        const formData = new FormData();
        formData.append("id", values.id.toString());
        formData.append("name", values.name);
        const dateTime = new Date(`${values.date}T${values.startTime}`);
        formData.append("date", dateTime.toISOString());

        const startDateTime = new Date(`${values.date}T${values.startTime}`);
        formData.append("startTime", startDateTime.toISOString());

        const endDateTime = new Date(`${values.date}T${values.endTime}`);
        formData.append("endTime", endDateTime.toISOString());

        formData.append("location", values.location);
        formData.append("description", values.description);
        formData.append("organizer", values.organizer);
        formData.append("eventCategory", values.eventCategory);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${params.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update event");
        }
        setNotification("Event updated successfully");

        setTimeout(() => {
          router.push("/dashboard");
        }, 4000);
      } catch (error) {
        console.error("Error updating event:", error);
        setNotification("Failed to update event");
      }
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#d3e8ff] p-5">
      <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md md:p-8">
        <div className="flex justify-start items-start my-4">
          <img
            src="/Gelitix-wide.png"
            width={150}
            height={75}
            className="items-center"
            alt="Tiket Logo"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
        <Formik
          initialValues={event || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              <div>
                <label htmlFor="date" className="block mb-1">
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block mb-1">
                  Start Time:
                </label>
                <Field
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block mb-1">
                  End Time
                </label>
                <Field
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
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
                  as="select"
                  id="location"
                  name="location"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select a location</option>
                  {eventLocations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div>
                <label htmlFor="description" className="block mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              <div>
                <label htmlFor="organizer" className="block mb-1">
                  Organizer:
                </label>
                <Field
                  type="text"
                  id="organizer"
                  name="organizer"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>

              <div>
                <label
                  htmlFor="eventCategory"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Event Categories
                </label>
                <Field
                  as="select"
                  id="eventCategory"
                  name="eventCategory"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select Event Category</option>
                  {eventCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="my-5">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Update Event
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center">
          {notification}
        </div>
      )}
    </div>
  );
};

export default EditEventPage;
