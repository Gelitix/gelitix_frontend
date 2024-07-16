import React from "react";
import Profile from "../components/Profile";
import RoleBasedAccess from "@/app/components/RoleBasedAccess";

const page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_USER", "ROLE_EVENT_ORGANIZER"]}>
      <div>
        <Profile />
      </div>
    </RoleBasedAccess>
  );
};

export default page;
