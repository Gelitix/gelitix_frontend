"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EventPromoProps {
  ticketPrice: number;
}

interface Event {
  id: number;
  name: string;
}

const EventPromo: React.FC<EventPromoProps> = ({ ticketPrice }) => {
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/names`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(
            data.data.map((event: any) => ({ id: event.id, name: event.name }))
          );
        } else {
          setError("Failed to fetch events");
        }
      } catch (error) {
        setError("An error occurred while fetching events");
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchEvents();
    }
  }, [session]);

  const formik = useFormik({
    initialValues: {
      isReferral: false,
      quantity: 1,
      name: "",
      eventId: "",
      ticketPrice: ticketPrice,
      discount: 0,
      startValid: "",
      endValid: "",
    },
    onSubmit: async (values) => {
      const formatDatetime = (datetime: string) => {
        if (!datetime) return null;
        const date = new Date(datetime);
        return date.toISOString();
      };

      const formattedValues = {
        ...values,
        startValid: formatDatetime(values.startValid),
        endValid: formatDatetime(values.endValid),
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/promo-detail/create-promo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(formattedValues),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Promo created successfully", data);
          setNotification("Promo created successfully!");

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 4000);
        } else {
          console.error("Failed to create promo");
          setNotification("Failed to create promo. Please try again.");
        }
      } catch (error) {
        console.error("Error creating promo", error);
        setNotification("An error occurred. Please try again.");
      }
    },
  });

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isReferral = e.target.checked;
    formik.setFieldValue("isReferral", isReferral);
    if (isReferral) {
      formik.setFieldValue("discount", 10);
    } else {
      formik.setFieldValue("discount", 0);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-[#d3e8ff] min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
        <div className="py-3">
          <img
            src="/Gelitix-wide.png"
            width={150}
            height={75}
            alt="Gelitix Logo"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Create Event Promo
        </h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="eventId"
                className="block text-sm font-medium text-gray-700"
              >
                Event Name
              </label>
              <select
                id="eventId"
                name="eventId"
                value={formik.values.eventId}
                onChange={formik.handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isReferral"
                name="isReferral"
                checked={formik.values.isReferral}
                onChange={handleReferralChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isReferral"
                className="ml-2 block text-sm text-gray-900"
              >
                Is Referral (10% discount)
              </label>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Promo Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                disabled={formik.values.isReferral}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="startValid"
                className="block text-sm font-medium text-gray-700"
              >
                Start Valid
              </label>
              <input
                type="datetime-local"
                id="startValid"
                name="startValid"
                value={formik.values.startValid}
                onChange={formik.handleChange}
                step="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="endValid"
                className="block text-sm font-medium text-gray-700"
              >
                End Valid
              </label>
              <input
                type="datetime-local"
                id="endValid"
                name="endValid"
                value={formik.values.endValid}
                onChange={formik.handleChange}
                step="1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ticket quantity
              </h3>
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md">
                <span className="text-sm font-medium text-gray-700">Pax</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue(
                          "quantity",
                          Math.max(1, formik.values.quantity - 1)
                        )
                      }
                      disabled={formik.values.quantity <= 1}
                      className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      -
                    </button>
                    <span className="text-gray-900 font-medium">
                      {formik.values.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue(
                          "quantity",
                          formik.values.quantity + 1
                        )
                      }
                      className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Promo
              </button>
            </div>
          </form>
        )}
      </div>
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 text-center">
          {notification}
        </div>
      )}
    </div>
  );
};

export default EventPromo;
