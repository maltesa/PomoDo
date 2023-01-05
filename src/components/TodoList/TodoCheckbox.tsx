import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons";
import { ComponentProps } from "react";
import classed from "tw-classed";

const CheckboxButton = classed(
  "button",
  "h-6 w-6 shrink-0 rounded-full outline-none",
  "text-gray-400 hover:text-gray-700 dark:text-gray-700 hover:dark:text-gray-600 focus:text-amber"
);

interface Props extends ComponentProps<typeof CheckboxButton> {
  checked: boolean;
}

export function TodoCheckbox({ checked, ...btnProps }: Props) {
  const Icon = checked ? CheckCircledIcon : CircleIcon;

  return (
    <CheckboxButton {...btnProps}>
      <Icon className="h-6 w-6" />
    </CheckboxButton>
  );
}
