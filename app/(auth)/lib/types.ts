interface BaseInitialState<T extends string, K extends string> {
  fields: {
    [name in T]: {
      value: string;
      error: string | null;
    };
  };
  inputs: Input<T>[];
  invalid: boolean;
  formName: K;
}

export type InitialState =
  | BaseInitialState<"email" | "password", "signIn">
  | BaseInitialState<"email" | "password" | "confirmPassword", "signUp">
  | BaseInitialState<"email", "emailVerification">;

interface Input<T extends string> {
  text: string;
  type: HTMLInputElement["type"];
  name: T;
  icon: { path: string; alt: string; width: number; height: number };
  placeholder: string;
}
