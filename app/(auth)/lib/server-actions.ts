"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LuciaError } from "lucia";
import { auth } from "./lucia";
import { generateEmailVerificationToken } from "./token";
import { sendEmailVerificationLink } from "./emails";
import { RedirectType } from "next/dist/client/components/redirect";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface loginFields {
  email: string;
  password: string;
}

export async function signIn(fields: loginFields) {
  try {
    const user = await auth.useKey(
      "email",
      fields.email.toLowerCase(),
      fields.password,
    );
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);
    cookies().set(sessionCookie.name, sessionCookie.value);
  } catch (error) {
    // need to rethrow due to 'elegant' redirect behavior
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      throw "Invalid email or password";
    }
  }
  redirect("/", RedirectType.replace);
}

export async function signUp({ email, password }: loginFields) {
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: email.toLowerCase(), // unique id when using "email" auth method
        password, // hashed by Lucia
      },
      attributes: {
        email: email.toLowerCase(),
        email_verified: Boolean(false), // mysql thing for boolean
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const token = await generateEmailVerificationToken(user.userId);
    await sendEmailVerificationLink(token, user.email);
    const sessionCookie = auth.createSessionCookie(session);
    cookies().set(sessionCookie.name, sessionCookie.value);
  } catch (error) {
    // need to rethrow due to 'elegant' redirect behavior
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email already exists");
    }
    if (error instanceof Error && error.cause === "MAILGUN_ERROR") {
      throw new Error(error.message);
    }
  }
  redirect("/email-verification");
}

export async function resendEmailVerificationToken({
  email,
}: {
  email: string;
}) {
  const authRequest = auth.handleRequest({ request: null, cookies });
  const session = await authRequest.validate();
  if (!session) {
    redirect("/sign-in");
  }
  if (session.user.emailVerified) {
    redirect("/");
  }
  const token = await generateEmailVerificationToken(session.user.userId);
  const message = await sendEmailVerificationLink(token, email);
  return message;
}
