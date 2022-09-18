import Dexie, { Table } from "dexie";

export interface DBTodo {
  id: string;
  completed: 0 | 1;
  description: string;
  remainingTimeStr: string;
  category: string;
  index: number;
  createdAt: number;
}

export class PomoDoDb extends Dexie {
  todos!: Table<DBTodo>;

  constructor() {
    super("pomododb");
    this.version(1).stores({
      todos: "id, index, category, completed, createdAt, [category+completed]",
    });
  }
}

export const db = new PomoDoDb();
