import RoleBasedAccess from "@/app/components/RoleBasedAccess";
import EventPromo from "../components/EventPromo";

const ROLE_EVENT_ORGANIZER = "ROLE_EVENT_ORGANIZER";

const Page = () => {
  return (
    <RoleBasedAccess allowedRoles={["ROLE_EVENT_ORGANIZER"]}>
      <div>
        <EventPromo ticketPrice={0} />
      </div>
    </RoleBasedAccess>
  );
};

export default Page;
