import classNames from "classnames";
import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLProps,
  useState,
} from "react";

import { parseTimeStr, serializeTimeStr } from "@/src/utils/timeStrings";

interface TimeInputProps extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
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
}: TimeInputProps) {
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

  const styles = classNames(
    "bg-transparent py-1 w-20 bg-slate-200 dark:bg-slate-600 font-medium outline-none rounded text-center text-sm border border-transparent",
    isActive && "border-orange-500"
  );

  return (
    <input
      {...inputProps}
      type="text"
      value={hasFocus ? undefined : serializeTimeStr(value)}
      className={styles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
