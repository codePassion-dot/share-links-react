import { cookies } from "next/headers";
import AuthForm from "../_components/server/form";
import { redirect } from "next/navigation";
import { auth } from "../lib/lucia";

const inputs = [
  {
    text: "Email address",
    type: "email",
    name: "email" as const,
    icon: {
      path: "/email.svg",
      alt: "email input icon",
      width: 16,
      height: 16,
    },
    placeholder: "e.g. alex@email.com",
  },
  {
    text: "Password",
    type: "password",
    name: "password" as const,
    icon: {
      path: "/lock-key.svg",
      alt: "password input icon",
      width: 16,
      height: 16,
    },
    placeholder: "Enter your password",
  },
];

const initialState = {
  fields: {
    email: { value: "", error: null },
    password: { value: "", error: null },
  },
  inputs,
  invalid: true,
  formName: "signIn" as const,
};

export default async function SignInPage() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  if (session) {
    if (!session.user.emailVerified) redirect("/email-verification");
    redirect("/");
  }
  return (
    <AuthForm
      title="Login"
      subtitle="Add your details below to get back into the app"
      initialState={initialState}
      bottomText="Don't have an account?"
      bottomLinkText="Create account"
      bottomLinkHref="/sign-up"
      submitText="Login"
    />
  );
}
