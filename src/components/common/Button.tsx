import type { IconProps } from "@radix-ui/react-icons/dist/types";
import classNames from "classnames";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
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

export function Button({
  icon: Icon,
  className,
  children,
  ...btnProps
}: Props) {
  return (
    <button
      className={classNames(
        "px-4 py-2 border rounded bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-100 hover:dark:bg-slate-800",
        className
      )}
      {...btnProps}
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
