import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { ComponentProps, FC, forwardRef, ReactNode } from "react";
import classed from "tw-classed";

const BasicButton = classed(
  "button",
  "rounded border border-transparent bg-white text-gray-700 px-4 py-2 outline-2 outline-offset-2 outline-amber-400",
  "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
  "focus-visible:outline",
  "hover:bg-gray-50  hover:dark:bg-gray-800",
  "active:bg-gray-100 active:dark:bg-black",
  {
    variants: {
      active: {
        true: "font-medium outline",
      },
      block: { true: "block w-full" },
    },
  }
);

interface Props extends ComponentProps<typeof BasicButton> {
  icon?: FC<IconProps>;
  className?: string;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ icon: Icon, children, ...btnProps }, ref) => {
    return (
      <BasicButton {...btnProps} ref={ref}>
        {Icon ? (
          <span aria-hidden="true" className={children ? "mr-2" : ""}>
            <Icon className="inline" />
          </span>
        ) : null}
        {children}
      </BasicButton>
    );
  }
);
