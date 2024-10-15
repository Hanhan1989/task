import { TaskClass } from './TaskClass';
import { DatabaseSqlite } from '../../database/DatabaseSqlite';

export class TaskRepository {
  private dbInstance = DatabaseSqlite.getInstance();

  // Convierte el objeto plano en una instancia de TaskClass
  private mapRowToTask(row: any): TaskClass {
    return new TaskClass(row.id, row.titulo, row.texto, row.estado, row.posicion);
  }

  // Obtiene todas las tareas
  async getAllTasks(): Promise<TaskClass[]> {
    const query = 'SELECT * FROM tasks ORDER BY posicion ASC';
    const db = await this.dbInstance.openDb();
    const rows = await db.all(query);
    return rows ? rows.map(this.mapRowToTask) : [];
  }

  // Obtiene una tarea por su ID
  async getTaskById(id: number): Promise<TaskClass | null> {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    const db = await this.dbInstance.openDb();
    const row = await db.get(query, id);
    return row ? this.mapRowToTask(row) : null;
  }

  // Crea una nueva tarea
  async createTask(task: Omit<TaskClass, 'id'>): Promise<void> {
    const query = 'INSERT INTO tasks (titulo, texto, estado, posicion) VALUES (?, ?, ?, ?)';
    const db = await this.dbInstance.openDb();
    await db.run(query, task.titulo, task.texto, task.estado, task.posicion);
  }

  // Actualiza una tarea existente por su ID
  async updateTask(task: TaskClass): Promise<void> {
    const query = 'UPDATE tasks SET titulo = ?, texto = ?, estado = ?, posicion = ? WHERE id = ?';
    const db = await this.dbInstance.openDb();
    await db.run(query, task.titulo, task.texto, task.estado, task.posicion, task.id);
  }

  // Elimina una tarea por su ID
  async deleteTask(id: number): Promise<void> {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const db = await this.dbInstance.openDb();
    await db.run(query, id);
  }
}
