import { CommentClass } from './CommentClass';
import { DatabaseSqlite } from '../../database/DatabaseSqlite';

export class CommentRepository {
  private dbInstance = DatabaseSqlite.getInstance();

  // Convierte el objeto plano en una instancia de CommentClass
  private mapRowToComment(row: any): CommentClass {
    return new CommentClass(row.id, row.task_id, row.comment_text, row.created_at);
  }

  // Obtiene todos los comentarios
  async getAllComments(): Promise<CommentClass[]> {
    const query = 'SELECT * FROM comments ORDER BY created_at ASC';
    const db = await this.dbInstance.openDb();
    const rows = await db.all(query);
    return rows ? rows.map(this.mapRowToComment) : [];
  }

  // Obtiene todos los comentarios por ID de la tarea (task_id)
  async getCommentsByTaskId(task_id: number): Promise<CommentClass[]> {
    const query = 'SELECT * FROM comments WHERE task_id = ? ORDER BY created_at ASC';
    const db = await this.dbInstance.openDb();
    const rows = await db.all(query, task_id);
    return rows ? rows.map(this.mapRowToComment) : [];
  }

  // Obtiene un comentario por su ID
  async getCommentById(id: number): Promise<CommentClass | null> {
    const query = 'SELECT * FROM comments WHERE id = ?';
    const db = await this.dbInstance.openDb();
    const row = await db.get(query, id);
    return row ? this.mapRowToComment(row) : null;
  }

  // Crea un nuevo comentario
  async createComment(comment: Omit<CommentClass, 'id' | 'created_at'>): Promise<void> {
    const query = 'INSERT INTO comments (task_id, comment_text) VALUES (?, ?)';
    const db = await this.dbInstance.openDb();
    await db.run(query, comment.task_id, comment.comment_text);
  }

  // Elimina un comentario por su ID
  async deleteComment(id: number): Promise<void> {
    const query = 'DELETE FROM comments WHERE id = ?';
    const db = await this.dbInstance.openDb();
    await db.run(query, id);
  }

  // Elimina todos los comentarios por ID de la tarea (task_id)
  async deleteCommentsByTaskId(task_id: number): Promise<void> {
    const query = 'DELETE FROM comments WHERE task_id = ?';
    const db = await this.dbInstance.openDb();
    await db.run(query, task_id);
  }
}
