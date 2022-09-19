import classNames from "classnames";
import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  HTMLProps,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";

import { DBTodo } from "@/src/db";
import wellDoneAudio from "@/src/static/audio/welldone.ogg";
import { parseTimeStr, serializeTimeStr } from "@/src/utils/timeStrings";

interface Props extends DBTodo {
  autoFocus?: boolean;
  isActive?: boolean;
  placeholder?: string;
  onDelete?: (todo: DBTodo) => void;
  onChange?: (todo: DBTodo) => void;
  onSubmit?: (todo: DBTodo) => void;
}

export function TodoInput({
  autoFocus,
  isActive,
  placeholder,
  onDelete,
  onChange,
  onSubmit,
  ...todo
}: Props) {
  const [playWellDone] = useSound(wellDoneAudio);
  const [description, setDescription] = useState(todo.description);
  const [remainingMs, setRemainingMs] = useState(todo.remainingMs);

  const handleComplete: MouseEventHandler<HTMLButtonElement> = (_e) => {
    playWellDone();
    if (onChange) onChange({ ...todo, completed: 1 });
  };

  const handleDelete: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    if (value.length > 0 || e.code !== "Backspace") return;

    if (onDelete) onDelete(todo);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ ...todo, description, remainingMs });
  };

  useEffect(() => {
    onChange && onChange({ ...todo, description, remainingMs });
  }, [description, remainingMs]);

  return (
    <div className="dark:bg-slate-800 border border-transparent rounded bg-slate-50 px-4 py-3 flex items-center focus-within:is-active">
      <button
        className={classNames(
          "rounded-full w-6 h-6 border border-slate-500 mr-4 active:bg-green-500",
          { "bg-green-500": todo.completed }
        )}
        onClick={handleComplete}
      />
      <form onSubmit={handleSubmit} className="flex gap-3 w-full">
        <input
          autoFocus={autoFocus}
          type="text"
          className="text-lg rounded bg-transparent outline-none flex-grow text-medium"
          placeholder={placeholder || "Description"}
          value={description}
          onKeyDown={handleDelete}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <TimeInput
          isActive={isActive}
          value={isActive ? todo.remainingMs : remainingMs}
          onChange={(valueMs) => setRemainingMs(valueMs)}
        />
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}

interface TimeInputProps extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  value: number;
  isActive?: boolean;
  onChange?: (ms: number) => void;
}

function TimeInput({
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
    "bg-transparent py-1 w-20 bg-slate-600 font-medium outline-none rounded text-center text-sm border border-transparent",
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
