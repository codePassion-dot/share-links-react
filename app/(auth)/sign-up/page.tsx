import AuthForm from "../_components/server/form";

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
    text: "Create password",
    type: "password",
    name: "password" as const,
    icon: {
      path: "/lock-key.svg",
      alt: "password input icon",
      width: 16,
      height: 16,
    },
    placeholder: "At least 8 characters",
  },
  {
    text: "Confirm password",
    type: "password",
    name: "confirmPassword" as const,
    icon: {
      path: "/lock-key.svg",
      alt: "confirm password input icon",
      width: 16,
      height: 16,
    },
    placeholder: "At least 8 characters",
  },
];

const initialState = {
  fields: {
    email: { value: "", error: null },
    password: { value: "", error: null },
    confirmPassword: { value: "", error: null },
  },
  inputs,
  invalid: true,
  formName: "signUp" as const,
};

export default async function SignUpPage() {
  return (
    <AuthForm
      title="Create account"
      subtitle="Let's get you started sharing your links!"
      initialState={initialState}
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkHref="/sign-in"
      submitText="Create new account"
    />
  );
}
