"use client";
import Link from "next/link";
import AuthInput from "../components/input";
import { useReducer } from "react";
import Image from "next/image";
import { z } from "zod";
import { produce } from "immer";

const inputs = [
  {
    text: "Email address",
    type: "email",
    name: "email" as const,
    icon: (
      <Image
        src="/email.svg"
        alt="email input icon"
        width={16}
        height={16}
        priority
      />
    ),
    placeholder: "e.g. alex@email.com",
  },
  {
    text: "Password",
    type: "password",
    name: "password" as const,
    icon: (
      <Image
        src="/lock-key.svg"
        alt="password input icon"
        width={16}
        height={16}
        priority
      />
    ),
    placeholder: "Enter your password",
  },
];

const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(16, "No more than 16 characters"),
});

interface State {
  fields: {
    email: { value: string; error: string | null };
    password: { value: string; error: string | null };
  };
  invalid: boolean;
}

type ActionName = keyof State["fields"];

interface Action {
  name: ActionName;
  value: string;
}

const initialState = {
  fields: {
    email: { value: "", error: null },
    password: { value: "", error: null },
  },
  invalid: true,
};

const reducer = produce((state: State, action: Action) => {
  const fieldsForSchema = Object.fromEntries(
    Object.entries(state.fields).map(([name, { value }]) => [name, value]),
  );
  fieldsForSchema[action.name] = action.value;
  const result = userSchema.safeParse(fieldsForSchema);
  if (!result.success) {
    const formattedErrors = result.error.flatten().fieldErrors;
    state.fields[action.name].error = formattedErrors[action.name]?.[0] ?? null;
    state.fields[action.name].value = action.value;
    state.invalid = true;
    return state;
  }
  state.fields[action.name].value = action.value;
  state.fields[action.name].error = null;
  state.invalid = Object.values(state.fields).some(
    ({ error }) => typeof error === "string",
  );
  return state;
}, initialState);

export default function SignIn() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ name: name as ActionName, value });
  };
  console.log(state);

  const handleLogin = () => {
    console.log(state);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-xl font-bold"> Login </h2>
        <span className="text-lg font-normal text-smokey-grey">
          Add your details below to get back into the app
        </span>
      </div>
      <div className="mb-6 flex flex-col gap-6 self-stretch">
        {inputs.map(({ text, placeholder, type, name, icon }) => (
          <AuthInput
            onChange={onInputChange}
            value={state.fields[name].value}
            key={text}
            placeholder={placeholder}
            icon={icon}
            name={name}
            type={type}
            error={state.fields[name].error}
            text={text}
          />
        ))}
      </div>
      <button
        disabled={state.invalid}
        onClick={handleLogin}
        className="mb-6 grid place-items-center self-stretch rounded-lg bg-bluish-purple px-7 py-3 active:bg-pale-violet active:shadow-3xl active:shadow-bluish-purple/25 disabled:bg-bluish-purple/25"
      >
        <span className="text-lg font-semibold text-white"> Login </span>
      </button>
      <span className="text-lg font-normal text-smokey-grey">
        Don&apos;t have an account?{" "}
        <Link className="text-bluish-purple" href="/sign-up">
          Create account
        </Link>
      </span>
    </>
  );
}
