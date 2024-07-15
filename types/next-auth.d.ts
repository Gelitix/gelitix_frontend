import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    roles: string | string[];
    email?: string;
    username?: string;
    password?: string;
    name?: string;
    profilePicture?: string;
    referralCode?: string;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      roles: string | string[];
    } & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    roles?: string | string[];
    accessToken?: string;
  }
}

export interface SignInResponse {
  status: number;
  statusMessage: string;
  message: string;
  data: any;
}
