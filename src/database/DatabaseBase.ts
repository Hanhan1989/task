import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export class DatabaseBase
{

  protected db: Database | null = null;
  protected dbPath: string = ''

  async openDb(): Promise<void> 
  {

    this.db = await open({
      filename: this.dbPath,
      driver: sqlite3.Database,
    });

  }

  async initialize(): Promise<void>
  {

    if (this.db) {

      await this.db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          estado TEXT,
          posicion INTEGER
        )
      `);
      console.log('Tabla "tasks" creada o ya existente.');

    }

  }
}
