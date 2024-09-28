import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { app } from 'electron';
import path from 'path';

export class DatabaseSqlite {
  protected db: Database | null = null;
  protected dbPath: string = '';

  constructor() {
    this.setDbPath();
  }

  private setDbPath(): void {
    // Detecta si el entorno es Electron o Web
    if (this.isElectron()) {
      this.dbPath = path.join(app.getPath('userData'), 'mytask.db');
    } else {
      this.dbPath = path.resolve(__dirname, '../../data/mytask.db');
    }
  }

  private isElectron(): boolean {
    // Comprueba si el entorno es Electron
    return !!(process.versions as any).electron;
  }

  async openDb(): Promise<void> {
    this.db = await open({
      filename: this.dbPath,
      driver: sqlite3.Database,
    });
  }

  async initialize(): Promise<void> {
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
