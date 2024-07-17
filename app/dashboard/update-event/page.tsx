import React from "react";
import EventUpdate from "../components/EventUpdate";
import RoleBasedAccess from "@/app/components/RoleBasedAccess";

const page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_EVENT_ORGANIZER"]}>
      <div>
        <EventUpdate />
      </div>
    </RoleBasedAccess>
  );
};

export default page;