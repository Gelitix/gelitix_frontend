import React from "react";
import EventCreate from "../components/EventCreate";
import RoleBasedAccess from "@/app/components/RoleBasedAccess";

const page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_EVENT_ORGANIZER"]}>
      <div>
        <EventCreate />
      </div>
    </RoleBasedAccess>
  );
};

export default page;
