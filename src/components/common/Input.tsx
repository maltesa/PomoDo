import classNames from "classnames";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...inputProps }: Props, ref) => {
    return (
      <input
        className={classNames(
          "focus:is-active rounded border border-slate-200 bg-white px-3 py-2 text-lg outline-none dark:border-slate-700 dark:bg-slate-800",
          className
        )}
        {...inputProps}
        ref={ref}
      />
    );
  }
);
