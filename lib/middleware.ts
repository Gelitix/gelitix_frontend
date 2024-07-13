// // lib/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "@/lib/auth"; // Make sure this path is correct

// export async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
//   const isUserProfilePage = request.nextUrl.pathname.startsWith("/user_profile");

//   if (!session && request.nextUrl.pathname.startsWith("/user_profile")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // if (session && request.nextUrl.pathname === "/login") {
//   //   return NextResponse.redirect(new URL("/", request.url));
//   // }

//   if (isDashboardPage) {
//     if (!session) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   if (isUserProfilePage) {
//     if (!session) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login"],
// };
