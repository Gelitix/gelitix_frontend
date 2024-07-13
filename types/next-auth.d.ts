// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string; // Change this to string
    roles: string[];
    email?: string;
    username?: string;
    password?: string;
    name?: string;
    profilePicture?: string;
    referralCode?: string;
    token: string;
  }

  interface Session {
    user: User & {
      roles: string[];
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
    accessToken?: string;
  }
}

export interface SignInResponse {
  status: number;
  statusMessage: string;
  message: string;
  data: any;
}
