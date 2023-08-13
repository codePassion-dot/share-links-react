import { produce } from "immer";
import { useReducer } from "react";
import { z } from "zod";

interface State {
  fields: {
    [name: string]: { value: string; error: string | null };
  };
  invalid: boolean;
}

interface Action<T extends State> {
  name: keyof T["fields"] extends string ? keyof T["fields"] : string;
  value: string;
}

export default function useForm<T extends State, K extends z.ZodTypeAny>(
  initialState: T,
  validationSchema: K,
) {
  const reducer = (state: T, action: Action<T>) => {
    const fieldsForSchema = Object.fromEntries(
      Object.entries(state.fields).map(([name, { value }]) => [name, value]),
    );
    fieldsForSchema[action.name] = action.value;
    const result = validationSchema.safeParse(fieldsForSchema);
    if (!result.success) {
      return produce(state, (draft) => {
        const formattedErrors = result.error.flatten().fieldErrors;
        draft.fields[action.name].error =
          formattedErrors[action.name]?.[0] ?? null;
        draft.fields[action.name].value = action.value;
        draft.invalid = true;
      });
    }
    return produce(state, (draft) => {
      draft.fields[action.name].value = action.value;
      draft.fields[action.name].error = null;
      draft.invalid = Object.values(draft.fields).some(
        ({ error }) => typeof error === "string",
      );
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({
      name,
      value,
    });
  };

  return { state, onInputChange };
}
