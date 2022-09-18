import classNames from "classnames";
import {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { db, DBTodo } from "../../db";
import { useWeekType } from "../../utils/useWeekType";

interface Props extends Partial<DBTodo> {
  autoFocus?: boolean;
  placeholder?: string;
  nextIndex?: number;
}

export function Todo({ autoFocus, placeholder, nextIndex, ...todo }: Props) {
  const weekType = useWeekType();
  const {
    id,
    index,
    createdAt,
    completed,
    description,
    remainingTimeStr = "25m",
  } = todo;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const description = e.currentTarget.description.value;
    const remainingTimeStr = e.currentTarget.remainingTimeStr.value;

    db.todos.put({
      id: id || uuidv4(),
      category: weekType,
      completed: 0,
      createdAt: createdAt || Date.now(),
      index: index || nextIndex || 0,
      description,
      remainingTimeStr,
    });
  };

  const handleComplete: MouseEventHandler<HTMLButtonElement> = (_e) => {
    if (!id) return;

    db.todos.update(id, { completed: true });
  };

  const handleDelete: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    if (!id || value.length > 0 || e.code !== "Backspace") return;

    db.todos.delete(id);
  };

  return (
    <div className="dark:bg-slate-800 border border-transparent rounded bg-slate-50 px-4 py-3 flex items-center focus-within:is-active">
      <button
        className={classNames(
          "rounded-full w-6 h-6 border border-slate-500 mr-4 active:bg-green-500",
          { "bg-green-500": completed }
        )}
        onClick={handleComplete}
      />
      <form onSubmit={handleSubmit} className="flex gap-3 w-full">
        <input
          autoFocus={autoFocus}
          name="description"
          type="text"
          className="text-lg rounded bg-transparent outline-none flex-grow text-medium"
          placeholder={placeholder || "Description"}
          defaultValue={description}
          onKeyDown={handleDelete}
        />
        <input
          name="remainingTimeStr"
          type="text"
          className="bg-transparent py-1 w-16 bg-slate-600 font-medium outline-none rounded text-center text-sm"
          defaultValue={remainingTimeStr}
        />
        <input type="submit" className="hidden" />
      </form>
    </div>
  );
}
