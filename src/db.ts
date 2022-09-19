import Dexie, { Table } from "dexie";

export interface DBTodo {
  id: string;
  completed: 0 | 1;
  description: string;
  remainingMs: number;
  category: string;
  pos: number;
  createdAt: number;
}

export class PomoDoDb extends Dexie {
  todos!: Table<DBTodo>;

  constructor() {
    super("pomododb");
    this.version(1).stores({
      todos: "id, pos, category, completed, createdAt, [category+completed]",
    });
  }
}

export const db = new PomoDoDb();
