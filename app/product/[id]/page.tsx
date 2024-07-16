"use client";

import React, { useEffect, useState } from "react";
import SectionBar from "../components/SectionBar";
import NavBar from "@/components/NavBar";
import EventMain from "../components/EventMain";
import EventDetail from "../components/EventDetail";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";

type productProps = {
  params: { id: string };
};

const Product = ({ params: { id } }: productProps) => {
  const router = useRouter();
  // const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/events/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <main>
      <NavBar />
      <EventMain event={event} />
      <SectionBar />
      <EventDetail event={event} />
      <Footer />
    </main>
  );
};

export default Product;
