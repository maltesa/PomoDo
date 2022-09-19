import { ComponentProps, useCallback, useEffect, useState } from "react";

import { db, DBTodo } from "@/src/db";
import overtimeAudio from "@/src/static/audio/overtime.ogg";

import { debounce } from "lodash";
import useSound from "use-sound";
import { TodoInput } from "./TodoInput";

type Props = Omit<ComponentProps<typeof TodoInput>, "onChange" | "onDelete">;

export function Todo({ isActive, remainingMs, ...props }: Props) {
  const [playOvertime] = useSound(overtimeAudio);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!isActive || remainingMs > 0 || played) return;

    playOvertime();
    setPlayed(true);
  }, [isActive, remainingMs, played]);

  const debouncedHandleChange = useCallback(
    debounce((todo: DBTodo) => {
      db.todos.put(todo);
    }, 300),
    []
  );

  return (
    <TodoInput
      isActive={isActive}
      remainingMs={remainingMs}
      onChange={debouncedHandleChange}
      onDelete={({ id }) => db.todos.delete(id)}
      {...props}
    />
  );
}
