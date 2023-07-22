import Dexie, { Table } from 'dexie'

export interface DBTodo {
  id: string
  projectId?: number
  completed: 0 | 1
  description: string
  remainingMs: number
  pos: number
  createdAt: number
}

export interface DBPrinciple {
  id?: number
  principle: string
  color?: string
  href?: string
}

export interface DBProject {
  id?: number
  name: string
  isDark: boolean
  bgImage?: string
}

export class PomoDoDb extends Dexie {
  todos!: Table<DBTodo>
  principles!: Table<DBPrinciple>
  projects!: Table<DBProject>

  constructor() {
    super('pomododb')
    this.version(1).stores({
      todos: 'id, pos, category, completed, createdAt, [category+completed]',
    })

    this.version(2).stores({
      todos: 'id, pos, category, completed, createdAt, [category+completed]',
      principles: '++id',
    })

    this.version(4).stores({
      projects: '++id',
      todos: 'id, pos, projectId, completed, createdAt, [projectId+completed]',
      principles: '++id',
    })
  }
}

export const db = new PomoDoDb()
