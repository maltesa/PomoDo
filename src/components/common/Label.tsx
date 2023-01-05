import classed from "tw-classed";

export const Label = classed(
  "label",
  "text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-400",
  {
    variants: {
      block: { true: "block" },
    },
  }
);
