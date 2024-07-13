import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import jwt from "jsonwebtoken";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const result = await res.json();

          if (!res.ok) {
            // Throw a custom error message
            throw new Error(result.message || "Invalid email or password");
          }

          if (result.data && result.data.token) {
            // Decode the JWT token
            const decodedToken = jwt.decode(result.data.token) as {
              [key: string]: any;
            } | null;

            if (!decodedToken) {
              throw new Error("Invalid token");
            }

            return {
              id: decodedToken.userId.toString(),
              email: decodedToken.sub,
              roles: decodedToken.roles.split(","),
              token: result.data.token, // Store the token
            };
          } else {
            throw new Error("Invalid response from server");
          }
        } catch (error) {
          // Throw the error message
          throw new Error(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.token; // Store the JWT token
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string[];
        session.accessToken = token.accessToken as string; // Include the JWT token in the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
});
