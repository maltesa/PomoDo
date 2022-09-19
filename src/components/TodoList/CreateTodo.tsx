import { useState } from "react";
import { v4 as uuid } from "uuid";

import { sessionDurationMs } from "@/components/Timer";
import { db } from "@/src/db";
import { useWeekType } from "@/utils/useWeekType";

import { TodoInput } from "./TodoInput";

interface Props {
  pos: number;
}

export function CreateTodo({ pos }: Props) {
  const weekType = useWeekType();
  const [refresh, setReferesh] = useState(Math.random());

  console.log(pos);

  return (
    <TodoInput
      autoFocus
      key={refresh}
      id="none"
      pos={0}
      placeholder="Add a new Task"
      category={weekType}
      completed={0}
      description=""
      remainingMs={sessionDurationMs}
      createdAt={0}
      onSubmit={async (newTodo) => {
        await db.todos.add({
          ...newTodo,
          id: uuid(),
          createdAt: Date.now(),
          pos,
        });
        setReferesh(Math.random());
      }}
    />
  );
}
