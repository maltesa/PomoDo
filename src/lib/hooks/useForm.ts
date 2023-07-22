import type { FormEventHandler } from "react";

type SubmitHandlerBuilder<T> = (
  callback: (values: T, form: HTMLFormElement) => void
) => FormEventHandler<HTMLFormElement>;

export function useForm<S extends string>(
  ...fields: S[]
): SubmitHandlerBuilder<Record<S, string>> {
  const builder: SubmitHandlerBuilder<Record<S, string>> = (callback) => {
    return (event) => {
      event.preventDefault();

      // @ts-ignore
      const data: Record<S, string> = {};
      fields.forEach((field) => {
        // @ts-ignore
        data[field] = event.target.elements[field]?.value;
      });

      callback(data, event.currentTarget);
    };
  };

  return builder;
}
