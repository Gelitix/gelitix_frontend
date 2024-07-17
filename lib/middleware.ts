import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // Make sure this path is correct
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await auth();

  console.log("Session:", session); // Debugging statement

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      console.log("No session, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    console.log("User Roles:", userRoles); // Debugging statement

    // Ensure that userRoles is treated as an array for consistency
    const hasEventOrganizerRole = Array.isArray(userRoles)
      ? userRoles.includes("ROLE_EVENT_ORGANIZER")
      : userRoles === "ROLE_EVENT_ORGANIZER";

    if (!hasEventOrganizerRole) {
      console.log(
        "User does not have the ROLE_EVENT_ORGANIZER, redirecting to unauthorized"
      );
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/events")) {
    if (!session) {
      console.log("No session, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    console.log("User Roles:", userRoles); // Debugging statement

    // Ensure that userRoles is treated as an array for consistency
    const hasEventOrganizerRole = Array.isArray(userRoles)
      ? userRoles.includes("ROLE_EVENT_ORGANIZER")
      : userRoles === "ROLE_EVENT_ORGANIZER";

    if (!hasEventOrganizerRole) {
      console.log(
        "User does not have the ROLE_EVENT_ORGANIZER, redirecting to unauthorized"
      );
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/user")) {
    if (!session) {
      console.log("No session, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles;
    console.log("User Roles:", userRoles); // Debugging statement

    // Ensure that userRoles is treated as an array for consistency
    const hasRequiredRole = Array.isArray(userRoles)
      ? userRoles.includes("ROLE_EVENT_ORGANIZER") ||
        userRoles.includes("ROLE_USER")
      : userRoles === "ROLE_EVENT_ORGANIZER" || userRoles === "ROLE_USER";

    if (!hasRequiredRole) {
      console.log(
        "User does not have the required role, redirecting to unauthorized"
      );
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/user/:path*", "/events/:path*"],
};
