import { useCallback, useEffect, useState } from "react";

import { db, DBTodo } from "@/src/db";
import overtimeAudio from "@/src/static/audio/overtime.ogg";

import { useLiveQuery } from "dexie-react-hooks";
import { debounce } from "lodash";
import useSound from "use-sound";
import { TodoInput } from "./TodoInput";

interface Props {
  id: string;
  isActive: boolean;
}
export function Todo({ id, isActive }: Props) {
  const [playOvertime] = useSound(overtimeAudio);
  const [played, setPlayed] = useState(false);
  const todo = useLiveQuery(async () => await db.todos.get(id), [id]);

  useEffect(() => {
    if (!isActive || !todo || played || todo.remainingMs > 0) return;

    playOvertime();
    setPlayed(true);
  }, [isActive, todo?.remainingMs, played]);

  const debouncedHandleChange = useCallback(
    debounce((todo: DBTodo) => {
      db.todos.put(todo);
    }, 100),
    []
  );

  if (!todo) return null;

  return (
    <TodoInput
      isActive={isActive}
      onChange={debouncedHandleChange}
      onDelete={({ id }) => db.todos.delete(id)}
      {...todo}
    />
  );
}
