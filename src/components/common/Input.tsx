import classNames from "classnames";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef(
  ({ className, ...inputProps }: Props, ref) => {
    return (
      <input
        className={classNames(
          "rounded border border-slate-200 bg-white px-3 py-2 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 focus:dark:border-slate-500",
          className
        )}
        {...inputProps}
      />
    );
  }
);
