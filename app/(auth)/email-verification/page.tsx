import { cookies } from "next/headers";
import { auth } from "../lib/lucia";
import { redirect } from "next/navigation";
import AuthForm from "../_components/server/form";
const inputs = [
  {
    text: "Verification token",
    type: "text",
    name: "email" as const,
    icon: {
      path: "/email.svg",
      alt: "email input icon",
      width: 16,
      height: 16,
    },
    placeholder: "e.g. alex@email.com",
  },
];

const initialState = {
  fields: {
    email: { value: "", error: null },
  },
  inputs,
  invalid: true,
  formName: "emailVerification" as const,
};

export default async function ResendEmailVerificationPage() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  if (!session) redirect("/sign-in");
  if (session.user.emailVerified) redirect("/");

  return (
    <AuthForm
      title="Resend email verification token"
      subtitle="Your token should be in your inbox, but if it's not, you can resend it here."
      initialState={initialState}
      bottomText="Don't have an account?"
      bottomLinkText="Create account"
      bottomLinkHref="/sign-up"
      submitText="Send verification token"
    />
  );
}
