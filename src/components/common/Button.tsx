import type { IconProps } from "@radix-ui/react-icons/dist/types";
import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  forwardRef,
  ReactNode,
} from "react";

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends HTMLButtonProps {
  icon?: FC<IconProps>;
  className?: string;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ icon: Icon, className, children, ...btnProps }, ref) => {
    return (
      <button
        className={classNames(
          "focus:is-active rounded border border-transparent bg-white px-4 py-2 outline-none hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 hover:dark:bg-slate-800",
          className
        )}
        {...btnProps}
        ref={ref}
      >
        {Icon ? (
          <span aria-hidden="true" className={children ? "mr-2" : ""}>
            <Icon className="inline" />
          </span>
        ) : null}
        {children}
      </button>
    );
  }
);
