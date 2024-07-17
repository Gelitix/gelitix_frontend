"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  organizer: string;
  isFree: boolean;
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
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
          setEvent(data);
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      }
    };
    fetchEvent();
  }, [session, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.accessToken && event) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${params.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update event");
        }
        router.push("/events");
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEvent((prev) => ({
      ...prev!,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date.split("T")[0]}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="organizer" className="block mb-1">
            Organizer:
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={event.organizer}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="isFree" className="block mb-1">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={event.isFree}
              onChange={handleInputChange}
              className="mr-2"
            />
            Is Free
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
