import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import useSound from "use-sound";

import { Input } from "@/components/common/Input";
import { DBTodo } from "@/src/db";
import wellDoneAudio from "@/src/static/audio/welldone.ogg";
import { parseTimeStr } from "@/utils/timeStrings";

import { TimeInput } from "./TimeInput";
import { TodoCheckbox } from "./TodoCheckbox";

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
  const [isCompleted, setIsCompleted] = useState(todo.completed === 1);

  const handleComplete: MouseEventHandler<HTMLButtonElement> = (_e) => {
    playWellDone();
    setIsCompleted(true);

    if (onChange) onChange({ ...todo, completed: 1 });
  };

  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const description = e.currentTarget.value;
    onChange && onChange({ ...todo, description });
  };

  const handleDurationChange = useCallback(
    (newDurationMs: number) => {
      onChange && onChange({ ...todo, remainingMs: newDurationMs });
    },
    [onChange, todo]
  );

  const handleDelete: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    if (value.length > 0 || e.code !== "Backspace") return;

    if (onDelete) onDelete(todo);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!onSubmit) return;

    // @ts-ignore
    const description = e.target?.description?.value;
    // @ts-ignore
    const durationStr = e.target?.duration?.value || "25m";
    const durationMs = parseTimeStr(durationStr);

    onSubmit({ ...todo, description, remainingMs: durationMs });
  };

  return (
    <div className="focus-within:is-active flex items-center gap-3 rounded border border-transparent bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <TodoCheckbox checked={isCompleted} onClick={handleComplete} />
      <form onSubmit={handleSubmit} className="flex w-full gap-3">
        <Input
          type="text"
          name="description"
          variant="simple"
          autoFocus={autoFocus}
          className="flex-grow"
          placeholder={placeholder || "Description"}
          defaultValue={todo.description}
          onKeyDown={handleDelete}
          onChange={handleDescriptionChange}
        />
        <TimeInput
          name="duration"
          isActive={isActive}
          value={todo.remainingMs}
          onChange={handleDurationChange}
        />
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}
