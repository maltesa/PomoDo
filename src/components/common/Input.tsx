import classed from "tw-classed";

export const Input = classed(
  "input",
  "rounded text-lg outline-none placeholder:dark:text-gray",
  {
    variants: {
      variant: {
        default:
          "px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:is-active",
        simple: "px-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
