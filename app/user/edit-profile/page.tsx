import React from "react";
import EditProfile from "../components/EditProfile";
import RoleBasedAccess from "@/app/components/RoleBasedAccess";

const page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_USER", "ROLE_EVENT_ORGANIZER"]}>
      <EditProfile />
    </RoleBasedAccess>
  );
};

export default page;
