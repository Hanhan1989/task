import { Task } from './Task'
import { DatabaseSqlite } from '../../database/DatabaseSqlite'

export class TaskRepository {
  private dbInstance = DatabaseSqlite.getInstance()
  // Obtiene todas las tareas
  async getAllTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks'
    const db = await this.dbInstance.openDb()
    const rows = await db.all(query)
    return rows ? (rows as Task[]) : []
  }

  // Obtiene una tarea por su ID
  async getTaskById(id: number): Promise<Task | null> {
    const query = 'SELECT * FROM tasks WHERE id = ?'
    const db = await this.dbInstance.openDb()
    const task = await db.get(query, id)
    return task ? (task as Task) : null
  }

  // Crea una nueva tarea
  async createTask(titulo: string, estado: string, posicion: number): Promise<void> {
    const query = 'INSERT INTO tasks (titulo, estado, posicion) VALUES (?, ?, ?)'
    const db = await this.dbInstance.openDb()
    await db.run(query, titulo, estado, posicion)
  }

  // Actualiza una tarea existente por su ID
  async updateTask(id: number, titulo: string, estado: string, posicion: number): Promise<void> {
    const query = 'UPDATE tasks SET titulo = ?, estado = ?, posicion = ? WHERE id = ?'
    const db = await this.dbInstance.openDb()
    await db.run(query, titulo, estado, posicion, id)
  }

  // Elimina una tarea por su ID
  async deleteTask(id: number): Promise<void> {
    const query = 'DELETE FROM tasks WHERE id = ?'
    const db = await this.dbInstance.openDb()
    await db.run(query, id)
  }
}
