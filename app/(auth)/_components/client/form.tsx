"use client";

import Image from "next/image";
import AuthInput from "./input";
import {
  emailVerificationTokenSchema,
  signInSchema,
  signUpSchema,
} from "../../lib/schemas";
import useForm from "../../hooks/useForm";
import {
  signIn,
  signUp,
  resendEmailVerificationToken,
} from "../../lib/server-actions";
import { toast } from "react-toastify";
import { InitialState } from "../../lib/types";

const actions = {
  signIn,
  signUp,
  emailVerification: resendEmailVerificationToken,
};

const schemas = {
  signIn: signInSchema,
  signUp: signUpSchema,
  emailVerification: emailVerificationTokenSchema,
};

interface FormProps {
  initialState: InitialState;
  submitText: string;
}

export default function Form({ submitText, initialState }: FormProps) {
  const { state, onInputChange, fieldsValues } = useForm(
    initialState,
    schemas[initialState.formName],
  );

  return (
    <form
      action={() => {
        toast.promise(
          state.formName === "emailVerification"
            ? actions[state.formName]({
                email: state.fields.email.value,
              })
            : actions[state.formName]({
                email: state.fields.email.value,
                password: state.fields.password.value,
              }),
          {
            pending: {
              render() {
                return "Loading...";
              },
              icon: true,
            },
            success: {
              render({ data }) {
                return `Hello ${data}`;
              },
            },
            error: {
              render(props) {
                if (props.data instanceof Error) {
                  return <>{props.data.message}</>;
                }
                return "Something went wrong";
              },
            },
          },
        );
      }}
      className="mb-5 flex flex-col gap-6 self-stretch"
    >
      {state.inputs.map(({ text, placeholder, type, name, icon }, idx) => (
        <AuthInput
          onChange={onInputChange}
          value={fieldsValues[idx].value}
          key={text}
          placeholder={placeholder}
          icon={
            <Image
              src={icon.path}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              priority
            />
          }
          name={name}
          type={type}
          error={fieldsValues[idx].error}
          text={text}
        />
      ))}
      <button
        type="submit"
        disabled={state.invalid}
        className="mb-6 grid place-items-center self-stretch rounded-lg bg-bluish-purple px-7 py-3 active:bg-pale-violet active:shadow-3xl active:shadow-bluish-purple/25 disabled:bg-bluish-purple/25"
      >
        <span className="text-lg font-semibold text-white"> {submitText} </span>
      </button>
    </form>
  );
}
