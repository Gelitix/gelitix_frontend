"use client";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

interface EventFormValues {
  id: any;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  organizer: string;
  eventCategory: string;
  isFree: boolean;
  ticketTypes: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  imageFile: File | null;
}

const initialValues: EventFormValues = {
  id: "",
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  description: "",
  organizer: "",
  eventCategory: "",
  isFree: false,
  ticketTypes: [{ name: "", price: 0, quantity: 0 }],
  imageFile: null,
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
  isFree: Yup.boolean().required("Required"),
  ticketTypes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        price: Yup.number()
          .min(0, "Price must be a positive number")
          .required("Required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Required"),
      })
    )
    .min(1, "At least one ticket type is required"),
  imageFile: Yup.mixed().required("Image is required"),
});

const EventUpdate: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [eventCategories, setEventCategories] = useState<Category[]>([]);
  const [eventLocations, setEventLocations] = useState<Location[]>([]);
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const [eventList, setEventList] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [selectedEvent, setSelectedEvent] = useState<EventFormValues | null>(
    null
  );

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

  const fetchEventList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/list`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch event list");
      }
      const data = await response.json();
      setEventList(data); // Assuming data is an array fetched from the API
    } catch (error) {
      console.error("Error fetching event list:", error);
    }
  };

  useEffect(() => {
    fetchEventCategories();
    fetchEventLocations();
    fetchEventList();
  }, [session]);

  const handleSubmit = async (values: EventFormValues) => {
    if (!session || !selectedEvent?.id) {
      console.error("No active session or event ID");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);

    // Convert date and time to ISO 8601 format
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
    formData.append("isFree", values.isFree.toString());

    // Append ticketTypes as separate form fields
    values.ticketTypes.forEach((ticket, index) => {
      formData.append(`ticketTypes[${index}].type`, ticket.name);
      formData.append(`ticketTypes[${index}].price`, ticket.price.toString());
      formData.append(
        `ticketTypes[${index}].quantity`,
        ticket.quantity.toString()
      );
    });

    if (values.imageFile) {
      formData.append("image", values.imageFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${selectedEvent.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Event updated successfully", data);
        setSuccessMessage("Event updated successfully!");

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        console.error("Failed to update event");
        setSuccessMessage("Failed to update event. Please try again.");
      }
    } catch (error) {
      console.error("Error updating event", error);
      setSuccessMessage("An error occurred. Please try again.");
    }
  };

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
        <h2 className="mb-6 text-2xl font-bold text-left text-gray-800 md:text-3xl">
          Update Event
        </h2>
        <Formik
          initialValues={selectedEvent || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="eventSelect"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Select Event to Update
                </label>
                <select>
                  <option value="">Select an event</option>
                  {eventList.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Event Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
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
              </div>
              <div>
                <label
                  htmlFor="startTime"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <Field
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
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
              </div>
              <div>
                <label
                  htmlFor="organizer"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Organizer
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
                  Event Category
                </label>
                <Field
                  as="select"
                  id="eventCategory"
                  name="eventCategory"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  <option value="">Select a category</option>
                  {eventCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label
                  htmlFor="isFree"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Is Free Event
                </label>
                <Field
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                  className="mr-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("isFree", e.target.checked);
                    if (e.target.checked) {
                      // Set all ticket prices to 0 when event is marked as free
                      const updatedTicketTypes = values.ticketTypes.map(
                        (ticket) => ({
                          ...ticket,
                          price: 0,
                        })
                      );
                      setFieldValue("ticketTypes", updatedTicketTypes);
                    }
                  }}
                />
              </div>
              <div className="py-1">Ticket Name</div>
              <FieldArray name="ticketTypes">
                {({ push, remove }) => (
                  <div>
                    {values.ticketTypes.map((_, index) => (
                      <div key={index} className="mb-4">
                        <Field
                          name={`ticketTypes.${index}.name`}
                          placeholder="Ticket Name"
                          className="w-full px-4 py-2 mb-2 border rounded-md"
                        />
                        <div className="py-2"> Price </div>
                        <Field
                          name={`ticketTypes.${index}.price`}
                          type="number"
                          placeholder="Price"
                          className="w-full px-4 py-2 mb-2 border rounded-md"
                          disabled={values.isFree}
                          value={
                            values.isFree ? 0 : values.ticketTypes[index].price
                          }
                        />
                        <div className="py-2"> Quantity </div>
                        <Field
                          name={`ticketTypes.${index}.quantity`}
                          type="number"
                          placeholder="Quantity"
                          className="w-full px-4 py-2 mb-2 border rounded-md"
                        />
                        <button type="button" onClick={() => remove(index)}>
                          <div className="py-1"> Remove </div>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          name: "",
                          price: values.isFree ? 0 : "",
                          quantity: 0,
                        })
                      }
                    >
                      <div className="py-1">Add Ticket Type </div>
                    </button>
                  </div>
                )}
              </FieldArray>
              <div>
                <label
                  htmlFor="imageFile"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Event Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("imageFile", file || null);
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-64 object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="py-4">
                <Button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Update Event
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventUpdate;
