import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { sessionDurationMs } from "@/components/Timer";
import { ActiveProjectContext } from "@/src/ActiveProjectContextProvider";
import { db } from "@/src/db";

import { TodoInput } from "./TodoInput";

export function CreateTodo() {
  const activeProject = useContext(ActiveProjectContext);
  const [refresh, setReferesh] = useState(Math.random());

  return (
    <TodoInput
      autoFocus
      key={refresh}
      id="none"
      pos={0}
      placeholder="Add a new Task"
      projectId={activeProject.id}
      completed={0}
      description=""
      remainingMs={sessionDurationMs}
      createdAt={0}
      onSubmit={async (newTodo) => {
        const pos = await db.todos.count();
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
