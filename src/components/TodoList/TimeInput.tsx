import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  useState,
} from "react";

import { parseTimeStr, serializeTimeStr } from "@/src/utils/timeStrings";
import classed from "tw-classed";

const TimeInputBasic = classed(
  "input",
  "py-1 w-20 bg-white dark:bg-gray-800 font-medium outline-none rounded text-center text-sm border dark:border-gray-700",
  { variants: { active: { true: "border-orange-500" } } }
);

interface Props
  extends Omit<ComponentProps<typeof TimeInputBasic>, "onChange"> {
  value: number;
  isActive?: boolean;
  onChange?: (ms: number) => void;
}

export function TimeInput({
  isActive,
  onChange,
  onFocus,
  onBlur,
  value,
  ...inputProps
}: Props) {
  const [hasFocus, setHasFocus] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!onChange) return;

    const ms = parseTimeStr(e.currentTarget.value);
    onChange(ms);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setHasFocus(false);
    onBlur && onBlur(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setHasFocus(true);
    e.currentTarget.select();
    onBlur && onBlur(e);
  };

  return (
    <TimeInputBasic
      {...inputProps}
      active={isActive}
      type="text"
      value={hasFocus ? undefined : serializeTimeStr(value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
