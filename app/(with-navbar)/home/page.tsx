import { auth } from "@/app/(auth)/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  if (!session) redirect("/sign-in");
  if (!session.user.emailVerified) redirect("/email-verification");

  return <main className="flex min-h-screen flex-col items-center"></main>;
}
