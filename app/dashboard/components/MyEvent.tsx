import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the Event type based on your EventDto
interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  organizer: string;
  isFree: boolean;
  // Add other fields as necessary
}

const MyEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/list`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }

          const data = await response.json();
          setEvents(data.data); // Assuming the events are in the 'data' field of the response
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchEvents();
  }, [session]);

  return (
    <div className="flex justify-center p-5">
      <div className="w-full max-w-6xl">
        {" "}
        <Table>
          <TableCaption>A list of your events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell>{event.isFree ? "Free" : "Paid"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyEvent;
