import Link from "next/link";
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
  return (
    <>
      <div className="mb-10">
        <h2 className="text-xl font-bold"> {title} </h2>
        <span className="text-lg font-normal text-smokey-grey">{subtitle}</span>
      </div>
      <Form initialState={initialState} submitText={submitText} />
      <span className="flex flex-col items-center justify-center self-stretch text-lg font-normal text-smokey-grey md:flex-row md:gap-1">
        {bottomText}{" "}
        <Link className="text-bluish-purple" href={bottomLinkHref}>
          {bottomLinkText}
        </Link>
      </span>
    </>
  );
}
