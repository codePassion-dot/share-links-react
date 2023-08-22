import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/lucia";
import Form from "../client/form";
import { InitialState } from "../../lib/types";

interface AuthFormProps {
  title: string;
  subtitle: string;
  initialState: InitialState;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
  submitText: string;
}

export default async function AuthForm({
  title,
  subtitle,
  bottomLinkHref,
  initialState,
  bottomText,
  bottomLinkText,
  submitText,
}: AuthFormProps) {
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
    <>
      <div className="mb-10">
        <h2 className="text-xl font-bold"> {title} </h2>
        <span className="text-lg font-normal text-smokey-grey">{subtitle}</span>
      </div>
      <Form initialState={initialState} submitText={submitText} />
      <span className="flex flex-col items-center justify-center self-stretch text-lg font-normal text-smokey-grey md:inline">
        {bottomText}{" "}
        <Link className="text-bluish-purple" href={bottomLinkHref}>
          {bottomLinkText}
        </Link>
      </span>
    </>
  );
}
