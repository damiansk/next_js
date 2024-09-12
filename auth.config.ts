import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn;
      } else {
        return isLoggedIn
          ? Response.redirect(new URL("/dashboard", nextUrl))
          : true;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
