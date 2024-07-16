import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
            throw new Error(result.message || "Invalid email or password");
          }

          if (result.data && result.data.token) {
            const decodedToken = jwt.decode(result.data.token) as {
              [key: string]: any;
            } | null;

            if (!decodedToken) {
              throw new Error("Invalid token");
            }

            return {
              id: decodedToken.userId.toString(),
              email: decodedToken.sub,
              roles: decodedToken.roles,
              token: result.data.token,
            };
          } else {
            throw new Error("Invalid response from server");
          }
        } catch (error) {
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string | string[];
        session.accessToken = token.accessToken as string;
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
