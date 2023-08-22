import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import "lucia/polyfill/node";
import { prisma as client } from "@/app/lib/db/prisma";

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs(),
  experimental: {
    debugMode: true,
  },
  sessionCookie: {
    expires: false,
  },
  adapter: prisma(client),
  getUserAttributes: (data) => {
    return {
      email: data.email,
      emailVerified: Boolean(data.email_verified), // mysql is incapable of storing boolean values
    };
  },
});

export type Auth = typeof auth;
