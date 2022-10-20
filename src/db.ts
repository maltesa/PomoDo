import Dexie, { Table } from "dexie";

import { getWeekType } from "./utils/getWeekType";

export interface DBTodo {
  id: string;
  projectId?: number;
  completed: 0 | 1;
  description: string;
  remainingMs: number;
  pos: number;
  createdAt: number;
}

export interface DBPrinciple {
  id?: number;
  principle: string;
  color?: string;
  href?: string;
}

export interface DBProject {
  id?: number;
  name: string;
  isActive: 0 | 1;
  isDark: boolean;
  bgImage?: string;
}

export class PomoDoDb extends Dexie {
  todos!: Table<DBTodo>;
  principles!: Table<DBPrinciple>;
  projects!: Table<DBProject>;

  constructor() {
    super("pomododb");
    this.version(1).stores({
      todos: "id, pos, category, completed, createdAt, [category+completed]",
    });

    this.version(2).stores({
      todos: "id, pos, category, completed, createdAt, [category+completed]",
      principles: "++id",
    });

    this.version(3)
      .stores({
        projects: "++id,isActive",
        todos:
          "id, pos, projectId, completed, createdAt, [projectId+completed]",
        principles: "++id",
      })
      .upgrade(async () => {
        await createInitialProjects(this);
        const [coding, marketing] = await db.projects.toArray();

        const todos = await db.todos.toArray();
        const todoUpdates = (
          todos as unknown as Array<DBTodo & { category: string }>
        ).map(({ category, ...rest }) => ({
          ...rest,
          projectId: category === "coding" ? coding.id : marketing.id,
        }));

        db.todos.bulkPut(todoUpdates);
      });
  }
}

async function createInitialProjects(db: PomoDoDb) {
  if ((await db.projects.count()) > 0) return;

  const weekType = getWeekType();
  await db.projects.bulkAdd([
    {
      isActive: weekType === "coding" ? 1 : 0,
      name: "Coding",
      isDark: true,
    },
    {
      isActive: weekType === "coding" ? 0 : 1,
      name: "Marketing",
      isDark: false,
    },
  ]);
}

export const db = new PomoDoDb();

db.on("populate", () => {
  createInitialProjects(db);
});
