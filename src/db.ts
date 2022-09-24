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

export interface DBPrinciple {
  id?: number;
  principle: string;
  color?: string;
  href?: string;
}

export class PomoDoDb extends Dexie {
  todos!: Table<DBTodo>;
  principles!: Table<DBPrinciple>;

  constructor() {
    super("pomododb");
    this.version(1).stores({
      todos: "id, pos, category, completed, createdAt, [category+completed]",
    });

    this.version(2).stores({
      todos: "id, pos, category, completed, createdAt, [category+completed]",
      principles: "++id",
    });
  }
}

export const db = new PomoDoDb();
